import { FC } from 'react';
import { IUserProfile } from '../../types';

interface ProfileListProps {
  user: IUserProfile;
}

const ProfileItem: FC<ProfileListProps> = ({ user }) => {
  return (
    <div className="profile">
      <div className="profile__img-wrapper">
        <img className="profile__img" src={user.avatar_url} alt={user.login} />
      </div>
      <p className="profile__header">
        <a
          className="profile__link"
          href={user.html_url}
          rel="noreferrer"
          target="_blank"
        >
          {user.login}
        </a>
      </p>
    </div>
  );
};

export default ProfileItem;
