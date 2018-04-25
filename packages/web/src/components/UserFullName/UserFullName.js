import { isFunction } from 'ramda-adjunct';
import propSelector from '@pesposa/core/src/utils/propSelector';
import withProfileData from 'hocs/withProfileData';

const UserFullName = ({ userFullName, render, children }) => {
  const renderFn = children || render;

  return isFunction(renderFn) ? renderFn({ userFullName }) : userFullName;
};

export default withProfileData(
  {
    userFullName: ['displayName'],
  },
  propSelector('userId'),
)(UserFullName);
