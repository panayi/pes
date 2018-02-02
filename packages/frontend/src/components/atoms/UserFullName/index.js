import * as R from 'ramda';
import Typography from 'material-ui/Typography';
import { propSelector } from 'pesposa-utils';
import omitProps from 'utils/omitProps';
import withProfileData from 'components/hocs/withProfileData';

export default R.compose(
  withProfileData(
    {
      children: ['displayName'],
    },
    propSelector('userId'),
  ),
  omitProps(['userId']),
)(Typography);
