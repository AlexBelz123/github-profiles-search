import api from '../utils/api';
import { IUserProfileResponse } from '../types';

export const fetchUserProfiles = async (
  q: string,
  page: number
): Promise<IUserProfileResponse> => {
  const res = await api.get(`/search/users?q=${q}&page=${page}`);
  return res.data;
};
