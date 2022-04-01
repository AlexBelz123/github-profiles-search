import React, { useState, useEffect, Fragment, FC } from 'react';
import { IPaginationData } from '../../types';
import './index.scss';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

interface PaginationProps {
  totalRecords: number;
  pageLimit: number;
  pageNeighbours: number;
  onPageChanged: (data: IPaginationData) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalRecords,
  pageLimit,
  pageNeighbours,
  onPageChanged,
}) => {
  const totalPages = Math.ceil(totalRecords / pageLimit);

  const [currentPage, setCurrentPage] = useState(1);

  const gotoPage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords,
    };

    setCurrentPage(currentPage);
    onPageChanged(paginationData);
  };

  const handleClick = (page: number) => {
    gotoPage(page);
  };

  const handleMoveLeft = () => {
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = () => {
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  useEffect(() => {
    gotoPage(1);
  }, []);

  const pages = fetchPageNumbers();

  return (
    <Fragment>
      {totalPages < 1 ? null : (
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index} className="page-item">
                  <div className="page-link" onClick={handleMoveLeft}>
                    <span>prev</span>
                  </div>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index} className="page-item">
                  <div className="page-link" onClick={handleMoveRight}>
                    <span aria-hidden="true">next</span>
                  </div>
                </li>
              );

            return (
              <li
                key={index}
                className={`page-item${currentPage === page ? ' active' : ''}`}
              >
                <div
                  className="page-link"
                  onClick={(e) => handleClick(page as number)}
                >
                  {page}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Fragment>
  );
};

export default Pagination;
