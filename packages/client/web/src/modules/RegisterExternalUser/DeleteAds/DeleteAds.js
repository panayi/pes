import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withStateHandlers } from 'recompose';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AdsList from '../AdsList/AdsList';
import DeleteAdButton from './DeleteAdButton/DeleteAdButton';

const styles = theme => ({
  root: {
    maxWidth: 300,
  },
  deletedText: {
    color: theme.palette.error.main,
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
  button: {
    margin: [theme.spacing.unit * 2, 0],
  },
});

const DeleteAds = ({
  ads,
  currentAdId,
  publishedAds,
  code,
  adDeleted,
  DialogTitle,
  DialogContent,
  classes,
}) => {
  const initialAdsCount = R.length(ads);
  const remainingAdsCount = R.length(publishedAds);
  const deletedAdsCount = initialAdsCount - remainingAdsCount;

  return (
    <React.Fragment>
      <DialogTitle title="Delete your ads from Pesposa" closeButton />
      <DialogContent>
        <div className={classes.root}>
          <Typography paragraph>
            You have <span className={classes.bold}>{remainingAdsCount}</span>{' '}
            {remainingAdsCount > 1 ? 'ads' : 'ad'} on Pesposa{deletedAdsCount >
            0 ? (
              <span>
                &nbsp;(<span
                  className={classNames(classes.bold, classes.deletedText)}
                >
                  {deletedAdsCount} deleted
                </span>)
              </span>
            ) : null}.
          </Typography>
          <AdsList ads={publishedAds} currentAdId={currentAdId}>
            {ad => (
              <React.Fragment>
                <DeleteAdButton
                  className={classes.button}
                  adId={ad.id}
                  code={code}
                  onDeleted={adDeleted}
                />
                <Typography color="textSecondary" paragraph>
                  Warning: This will permanently delete your ad from Pesposa.
                </Typography>
              </React.Fragment>
            )}
          </AdsList>
        </div>
      </DialogContent>
    </React.Fragment>
  );
};

DeleteAds.defaultProps = {
  ads: [],
};

export default R.compose(
  withStateHandlers(
    ({ ads }) => ({
      publishedAds: ads,
    }),
    {
      adDeleted: ({ publishedAds }) => adId => ({
        publishedAds: R.reject(R.propEq('id', adId), publishedAds),
      }),
    },
  ),
  withStyles(styles),
)(DeleteAds);
