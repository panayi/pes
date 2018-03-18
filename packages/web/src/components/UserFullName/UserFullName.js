import propSelector from '@pesposa/core/src/utils/propSelector';
import withProfileData from 'hocs/withProfileData';

const UserFullName = ({ userFullName, render, children }) =>
  (children || render)({ userFullName });

export default withProfileData(
  {
    userFullName: ['displayName'],
  },
  propSelector('userId'),
)(UserFullName);
