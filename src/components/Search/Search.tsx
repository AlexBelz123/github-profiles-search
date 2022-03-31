import { FC, ChangeEvent } from 'react';
import './index.scss';

interface SearchProps {
  value: string;
  setValue: (value: string) => void;
}

const Search: FC<SearchProps> = ({ value, setValue }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input
      className="input"
      placeholder="Search"
      value={value}
      onChange={handleSearch}
    />
  );
};

export default Search;
