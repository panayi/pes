import * as R from 'ramda';
import { setDisplayName } from 'recompose';
import Typography from 'material-ui/Typography';
import { propSelector } from 'pesposa-utils';
import omitProps from 'utils/omitProps';
import withProfileData from 'hocs/withProfileData';

const UserFullName = R.compose(
  setDisplayName('UserFullName'),
  withProfileData(
    {
      children: ['displayName'],
    },
    propSelector('userId'),
  ),
  omitProps(['userId']),
)(Typography);

export default UserFullName;
