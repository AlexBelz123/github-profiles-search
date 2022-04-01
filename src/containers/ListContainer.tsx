import { useState, useEffect, FC } from 'react';
import { Search, Spinner } from '../components';
import { ProfileList, CenteredHeader } from '../common';
import { useDebounce } from '../hooks';
import { IUserProfile, IPaginationData } from '../types';
import { fetchUserProfiles } from '../services';
import Pagination from '../components/Pagination/';
import './index.scss';

const LIMIT = 35;
const GITHUB_PROFILES_LIMIT = 35;

const ListContainer = () => {
  const [value, setValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [users, setUsers] = useState<IUserProfile[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  // line below is additional cuz github api can fetch only first 1000 profiles
  const githubTotalUsers = totalUsers >= 1000 ? 1000 : totalUsers;

  console.log(totalUsers);

  const debouncedValue: string = useDebounce<string>(value, 500);

  const getUsersForCurrentQuery = async (page: number) => {
    try {
      setIsSearching(true);
      const { items } = await fetchUserProfiles(value, page);
      setUsers(items);
    } catch (err) {
      alert('There is a rate limit to current API, try again later');
    }
    setIsSearching(false);
  };

  const onPageChanged = async (data: IPaginationData) => {
    const { currentPage } = data;
    if (currentPage) {
      await getUsersForCurrentQuery(currentPage);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      fetchUserProfiles(value, 1).then((data) => {
        setIsSearching(true);
        const { total_count, items } = data;
        setUsers(items);
        setTotalUsers(Math.ceil(total_count / GITHUB_PROFILES_LIMIT));
        setIsSearching(false);
      });
    } else {
      setUsers([]);
      setTotalUsers(0);
    }
  }, [debouncedValue]);

  return (
    <div className="flex-vertical">
      <Search value={value} setValue={setValue} />
      {!isSearching && !users.length && (
        <CenteredHeader header="No results. Enter some text" />
      )}
      {isSearching ? <Spinner /> : <ProfileList users={users} />}
      <Pagination
        totalRecords={githubTotalUsers}
        pageLimit={LIMIT}
        pageNeighbours={3}
        onPageChanged={onPageChanged}
      />
    </div>
  );
};

export default ListContainer;
