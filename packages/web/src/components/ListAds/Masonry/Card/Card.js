import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Card, { CardMedia, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import LineClamp from 'components/LineClamp/LineClamp';
import Imgix from 'components/Imgix/Imgix';
import AdTitle from 'components/AdTitle/AdTitle';
import AdAddress from 'components/AdAddress/AdAddress';
import AdDistance from 'components/AdDistance/AdDistance';
import LinkToViewAd from 'components/LinkToViewAd/LinkToViewAd';
import * as constants from '../../constants';
import * as selectors from '../../selectors';

const styles = theme => ({
  root: {
    display: 'flex',
    padding: 1,
  },
  ad: {
    textDecoration: 'none',
  },
  adPaperRoot: {
    width: '100%',
    borderRadius: theme.borderRadius.xl,
  },
  media: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    borderRadius: `${theme.borderRadius.xl}px ${theme.borderRadius.xl}px 0 0`,
  },
  header: {
    padding: theme.spacing.unit,
    boxSizing: 'border-box',
    overflow: 'hidden',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: [0, theme.spacing.unit, '!important'],
    height: constants.CARD_CONTENT_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  title: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: theme.typography.subheading.fontSize,
    lineHeight: '1.2em',
  },
  location: {
    display: 'flex',
    justifyContent: 'center',
  },
  distance: {
    paddingLeft: theme.spacing.unit,
  },
});

const AdLink = withProps({ component: Link })(LinkToViewAd);

const AdCard = ({ hit, style, thumbnail, thumbnailHeight, classes }) => (
  <div className={classes.root} style={style}>
    <Imgix params={constants.IMGIX_PARAMS} image={thumbnail}>
      {({ src }) => (
        <Card
          className={classes.ad}
          classes={{
            root: classes.adPaperRoot,
          }}
          elevation={1}
          component={AdLink}
          ad={hit}
        >
          <CardMedia
            className={classes.media}
            image={src}
            style={{ height: `${thumbnailHeight}px` }}
          />
          <CardContent className={classes.content}>
            <AdTitle
              className={classes.title}
              component={LineClamp}
              variant="subheading"
              ad={hit}
              lines={2}
              height={37}
              tagName="h3"
            />
            <div className={classes.location}>
              <AdAddress ad={hit} variant="caption" align="center" />
              <AdDistance
                ad={hit}
                variant="caption"
                align="center"
                className={classes.distance}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </Imgix>
  </div>
);

AdCard.propTypes = {
  hit: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({}).isRequired,
  thumbnail: PropTypes.shape({}).isRequired,
  thumbnailHeight: PropTypes.number.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default R.compose(
  withProps(
    createStructuredSelector({
      thumbnail: selectors.thumbnailSelector,
      thumbnailHeight: selectors.thumbnailHeightSelector,
    }),
  ),
  withStyles(styles),
)(AdCard);
