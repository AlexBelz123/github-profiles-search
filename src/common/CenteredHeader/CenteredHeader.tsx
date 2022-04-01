import { FC } from 'react';
import './index.scss';

interface CenteredHeaderProps {
  header: string;
}

const CenteredHeader: FC<CenteredHeaderProps> = ({ header }) => {
  return <h2 className="centered-header">{header}</h2>;
};

export default CenteredHeader;
