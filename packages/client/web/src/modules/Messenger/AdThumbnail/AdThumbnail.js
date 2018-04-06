import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import withStyles from '@material-ui/core/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import Imgix from '@pesposa/client-core/src/components/Imgix/Imgix';

// type Props = {
//   ad: Object,
//   adThumbnail: Object,
//   size: number,
//   classes: Object,
// };

const DEFAULT_SIZE = 40;

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: theme.borderRadius.md,
  },
});

const AdThumbnail = ({ ad, adThumbnail, size, classes }) => (
  <div
    className={classes.root}
    style={{ flex: `0 0 ${size}px`, width: size, height: size }}
  >
    {adThumbnail && (
      <Imgix
        image={adThumbnail}
        params={{ w: size, h: size, fit: 'edges' }}
        alt={ad.title}
        style={{ width: size }}
      />
    )}
  </div>
);

AdThumbnail.defaultProps = {
  size: DEFAULT_SIZE,
};

export default R.compose(
  withProps(
    createStructuredSelector({
      adThumbnail: propSelector(['ad', 'thumbnail']),
    }),
  ),
  withStyles(styles),
)(AdThumbnail);
