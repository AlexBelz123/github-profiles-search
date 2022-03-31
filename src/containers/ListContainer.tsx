import { useState, useEffect } from 'react';
import { Search, Pagination, Spinner } from '../components';
import { ProfileList } from '../common';
import { useDebounce } from '../hooks';
import { IUserProfile } from '../types';
import { fetchUserProfiles } from '../services';
import './index.scss';

const ListContainer = () => {
  const [value, setValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<IUserProfile[]>([]);

  const debouncedValue: string = useDebounce<string>(value, 500);

  const getUsers = async () => {
    try {
      const { total_count, items } = await fetchUserProfiles(value, page);
      setUsers((prevUsers) => [...prevUsers, ...items]);
      setIsSearching(false);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      setIsSearching(true);
      getUsers();
    } else {
      setUsers([]);
    }
  }, [debouncedValue]);

  return (
    <div className="flex-vertical">
      <Search value={value} setValue={setValue} />
      {isSearching ? <Spinner /> : <ProfileList users={users} />}
      <Pagination />
    </div>
  );
};

export default ListContainer;
