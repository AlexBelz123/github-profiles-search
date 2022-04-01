import { useState, useEffect, FC } from 'react';
import { Search, Spinner } from '../components';
import { ProfileList } from '../common';
import { useDebounce } from '../hooks';
import { IUserProfile } from '../types';
import { fetchUserProfiles } from '../services';
import Pagination from '../components/Pagination/test';
import './index.scss';

const LIMIT = 4;

const ListContainer = () => {
  const [value, setValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [users, setUsers] = useState<IUserProfile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalRecords = users.length;

  // pagination
  // const lastIndex = currentPage * LIMIT;
  // const firstIndex = lastIndex - LIMIT;
  // const currentUsers = users.slice(firstIndex, lastIndex);
  // const totalRecords = Math.ceil(users.length / LIMIT);

  const debouncedValue: string = useDebounce<string>(value, 500);

  const getUsers = async () => {
    try {
      const { total_count, items } = await fetchUserProfiles(
        value,
        currentPage
      );
      setUsers((prevUsers) => [...prevUsers, ...items]);
      setIsSearching(false);
    } catch (err) {
      throw err;
    }
  };

  const onPageChanged = (data: any) => {
    const { currentPage, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = users.slice(offset, offset + pageLimit);

    setUsers(currentUsers);
    setCurrentPage(currentPage);
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
      {isSearching ? (
        <Spinner />
      ) : (
        <>
          <ProfileList users={users} />
          <Pagination
            totalRecords={totalRecords}
            pageLimit={LIMIT}
            onPageChanged={onPageChanged}
          />
        </>
      )}
    </div>
  );
};

export default ListContainer;
