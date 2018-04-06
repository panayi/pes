import { isFunction } from 'ramda-adjunct';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from '../../../lib/connectData';
import { models } from '../../../store/firebase/data';

const UserName = ({ name, defaultName, render, children }) => {
  const finalName = name || defaultName;
  const renderFn = children || render;

  return isFunction(renderFn) ? renderFn({ name: finalName }) : finalName;
};

UserName.defaultProps = {
  name: null,
  defaultName: null,
};

const mapDataToProps = {
  name: models
    .profiles(propSelector('userId'), propSelector('userType'))
    .child('name'),
};

export default connectData(mapDataToProps)(UserName);
