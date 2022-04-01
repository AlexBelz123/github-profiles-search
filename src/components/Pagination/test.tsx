import React, { FC, useState, useEffect } from 'react';

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
  pageLimit?: number;
  pageNeighbours?: number;
  onPageChanged: any;
}

const Pagination: FC<PaginationProps> = ({
  totalRecords,
  pageLimit = 30,
  pageNeighbours = 0,
  onPageChanged,
}) => {
  const totalPages = Math.ceil(totalRecords / pageLimit);

  const [currentPage, setCurrentPage] = useState(1);
  const gotoPage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      pageLimit: pageLimit,
      totalRecords: totalRecords,
    };

    setCurrentPage(onPageChanged(paginationData));
  };

  const handleClick = (page: any, evt: any) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt: any) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (evt: any) => {
    evt.preventDefault();
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

  const render = () => {
    if (totalPages === 1) return null;

    const pages = fetchPageNumbers();

    return (
      <ul className="pagination">
        <h4>Hello</h4>
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li
                key={index}
                className="pagination__item"
                onClick={handleMoveLeft}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li
                key={index}
                className="pagination__item"
                onClick={handleMoveRight}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </li>
            );

          return (
            <li
              key={index}
              className={`pagination__item${
                currentPage === page ? ' active' : ''
              }`}
              onClick={(e) => handleClick(page, e)}
            >
              {page}
            </li>
          );
        })}
      </ul>
    );
  };

  return <>{render()}</>;
};

export default Pagination;
