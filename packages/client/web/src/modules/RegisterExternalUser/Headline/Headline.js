import * as R from 'ramda';
import { withProps } from 'recompose';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    fontFamily: 'Circular,"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontWeight: 800,
    letterSpacing: -0.8,
    color: theme.palette.text.primary,
  },
});

const Headline = R.compose(
  withProps({
    variant: 'display1',
  }),
  withStyles(styles),
)(Typography);

export default Headline;
