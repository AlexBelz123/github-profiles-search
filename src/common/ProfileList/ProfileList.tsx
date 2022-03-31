import { FC } from 'react';
import ProfileItem from './ProfileItem';
import { IUserProfile } from '../../types';
import './index.scss';

interface ProfileListProps {
  users: IUserProfile[];
}

const ProfileList: FC<ProfileListProps> = ({ users }) => {
  return (
    <div className="profiles">
      {users.map((user) => (
        <ProfileItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default ProfileList;
