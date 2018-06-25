import * as R from 'ramda';
import { mapProps, withRenderProps, defaultProps } from 'recompose';
import { createSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propOrSelector from '@pesposa/core/src/utils/propOrSelector';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import { connectData } from '../../../lib/connectData';
import { models } from '../../../store/firebase/data';

const avatarSelector = createSelector(
  propSelector('userType'),
  propOrSelector({}, 'avatar'),
  (userType, avatar) =>
    userType === sellerTypes.USER
      ? avatar
      : R.compose(
          R.head,
          R.values,
        )(avatar),
);

const mapDataToProps = {
  avatar: models.avatars(propSelector('userId'), propSelector('userType')),
};

const UserAvatar = withRenderProps(
  R.compose(
    defaultProps({
      userType: sellerTypes.USER,
    }),
    connectData(mapDataToProps),
    mapProps(({ isLoaded, children, ...rest }) => ({
      avatar: avatarSelector(rest),
      loaded: isLoaded.avatar,
      children,
    })),
  ),
);

export default UserAvatar;
