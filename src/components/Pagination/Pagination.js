import { FC, Dispatch } from 'react';
import PaginationItem from './PaginationItem';
import './index.scss';

interface PaginationProps {
  itemsCount: number;
  currentPage: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({
  itemsCount,
  currentPage,
  setCurrentPage,
}) => {
  const goTo = (p: number) => {
    setCurrentPage(p);
  };

  const prev = () => {
    if (currentPage > 1) setCurrentPage((prev: number) => prev - 1);
  };

  const next = () => {
    if (currentPage < itemsCount) setCurrentPage((prev: number) => prev + 1);
  };

  const gotToFirst = () => {
    setCurrentPage(1);
  };

  const gotToLast = () => {
    setCurrentPage(itemsCount);
  };

  return !itemsCount ? null : (
    <div className="pagination">
      <PaginationItem onClick={prev} disabled={currentPage > 1 ? false : true}>
        prev
      </PaginationItem>
      {new Array(itemsCount).fill(null).map((_, idx) => (
        <PaginationItem key={idx} onClick={() => goTo(idx + 1)}>
          {idx + 1}
        </PaginationItem>
      ))}
      <PaginationItem
        onClick={next}
        disabled={currentPage < itemsCount ? false : true}
      >
        next
      </PaginationItem>
      <PaginationItem onClick={gotToFirst}>First</PaginationItem>
      <PaginationItem onClick={gotToLast}>Last</PaginationItem>
    </div>
  );
};

export default Pagination;
