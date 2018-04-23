import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withProps } from 'recompose';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import DoneIcon from 'material-ui-icons/CheckCircle';
import HourglassEmptyIcon from 'material-ui-icons/HourglassEmpty';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import translate from 'hocs/translate';
import A from 'components/A/A';
import ProfileImage from 'components/ProfileImage/ProfileImage';

const styles = theme => ({
  root: {
    maxWidth: 450,
  },
  ad: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 2,
    padding: [theme.spacing.unit, 0],
    borderTop: [1, 'solid', theme.palette.divider],
    borderBottom: [1, 'solid', theme.palette.divider],
  },
  adInfo: {
    marginLeft: theme.spacing.unit,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  titleText: {
    paddingLeft: theme.spacing.unit,
  },
  link: {
    display: 'inline',
  },
});

class PendingReviewAdStatus extends React.Component {
  static renderPending() {
    return (
      <Typography>
        Your ad is currently being reviewed and will publish soon. This dialog
        will update once your ad is published.
      </Typography>
    );
  }

  reloadPage = () => {
    window.location.href = '/';
  };

  renderTitle() {
    const { published, classes } = this.props;
    return (
      <div className={classes.title}>
        {published ? <DoneIcon /> : <HourglassEmptyIcon />}
        <div className={classes.titleText}>
          {published
            ? 'Your ad has been published!'
            : 'Your ad is pending review'}
        </div>
      </div>
    );
  }

  renderPublished() {
    return (
      <Typography>
        Note that it may take some time before it appears in the search results.
        If you don&apos;t see it yet, please try again in a few minutes, or{' '}
        <A className={this.props.classes.link} onClick={this.reloadPage}>
          reload the page
        </A>.
      </Typography>
    );
  }

  render() {
    const {
      ad,
      published,
      t,
      DialogContent,
      DialogTitle,
      classes,
    } = this.props;

    return (
      <React.Fragment>
        <DialogTitle title={this.renderTitle()} />
        <DialogContent className={classes.root}>
          <div className={classes.ad}>
            <ProfileImage userId={ad.user} />
            <div className={classes.adInfo}>
              <Typography variant="subheading">{ad.title}</Typography>
              <Typography variant="caption" color="textSecondary">
                {t(ad.category)}
              </Typography>
            </div>
          </div>
          {published
            ? this.renderPublished()
            : PendingReviewAdStatus.renderPending()}
        </DialogContent>
      </React.Fragment>
    );
  }
}

PendingReviewAdStatus.defaultProps = {
  ad: {},
};

const mapDataToProps = {
  pendingReviewAd: models.pendingReviewAds.one(propSelector(['ad', 'id'])),
};

export default R.compose(
  connectData(mapDataToProps),
  translate('categories'),
  withProps(({ pendingReviewAd }) => ({
    published: isNilOrEmpty(pendingReviewAd),
  })),
  withStyles(styles),
)(PendingReviewAdStatus);
