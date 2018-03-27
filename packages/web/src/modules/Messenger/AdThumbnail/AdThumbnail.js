/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import withStyles from 'material-ui/styles/withStyles';
import { selectors as imagesSelectors } from 'store/images';
import Imgix from 'components/Imgix/Imgix';

type Props = {
  ad: Object,
  adThumbnail: Object,
  size: number,
  classes: Object,
};

const DEFAULT_SIZE = 40;

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: theme.borderRadius.md,
  },
});

const AdThumbnail = ({ ad, adThumbnail, size, classes }: Props) => (
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
      adThumbnail: imagesSelectors.adFirstImageSelector,
    }),
  ),
  withStyles(styles),
)(AdThumbnail);
