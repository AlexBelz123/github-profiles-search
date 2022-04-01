import { useState, useEffect, FC } from 'react';
import { Search, Spinner } from '../components';
import { ProfileList, CenteredHeader } from '../common';
import { useDebounce } from '../hooks';
import { IUserProfile, IPaginationData } from '../types';
import { fetchUserProfiles } from '../services';
import Pagination from '../components/Pagination/';
import './index.scss';

const LIMIT = 6;

const ListContainer = () => {
  const [value, setValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [users, setUsers] = useState<IUserProfile[]>([]);
  const [currentUsers, setCurrentUsers] = useState<IUserProfile[]>([]);
  const totalUsers = users.length;

  const debouncedValue: string = useDebounce<string>(value, 500);

  const getUsers = async () => {
    try {
      const { total_count, items } = await fetchUserProfiles(value, 1);
      setUsers((prevUsers) => [...prevUsers, ...items]);
      setIsSearching(false);
    } catch (err) {
      throw err;
    }
  };

  const onPageChanged = (data: IPaginationData) => {
    const { currentPage, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = users.slice(offset, offset + pageLimit);

    setCurrentUsers(currentUsers);
  };

  useEffect(() => {
    if (debouncedValue) {
      setIsSearching(true);
      getUsers();
    } else {
      setUsers([]);
      setCurrentUsers([]);
    }
  }, [debouncedValue]);

  return (
    <div className="flex-vertical">
      <Search value={value} setValue={setValue} />
      {!isSearching && !users.length && (
        <CenteredHeader header="Enter some text to search github user profiles" />
      )}
      {isSearching ? (
        <Spinner />
      ) : (
        <>
          <ProfileList users={currentUsers} />
          <Pagination
            totalRecords={totalUsers}
            pageLimit={LIMIT}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
          />
        </>
      )}
    </div>
  );
};

export default ListContainer;
