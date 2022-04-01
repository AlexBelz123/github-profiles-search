import { FC } from 'react';

const PaginationItem: FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ onClick, children, ...props }) => {
  return (
    <button className="pagination__item" onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default PaginationItem;
