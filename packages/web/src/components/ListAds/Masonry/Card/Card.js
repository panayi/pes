import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps, withStateHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Card, { CardMedia, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import withStyles from 'material-ui/styles/withStyles';
import { Link } from 'react-router-dom';
import TouchDevice from 'components/TouchDevice/TouchDevice';
import Truncate from 'components/Truncate/Truncate';
import FavoriteAd from 'components/FavoriteAd/FavoriteAd';
import Imgix from 'components/Imgix/Imgix';
import AdTitle from 'components/AdTitle/AdTitle';
import AdPlace from 'components/AdPlace/AdPlace';
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
  favorite: {
    position: 'absolute',
    top: theme.spacing.unit * 1.5,
    right: theme.spacing.unit * 1.5,
    borderRadius: '50%',
  },
  favoriteButton: {
    color: theme.palette.primary.main,
    width: 38,
    height: 37,
    '& svg': {
      width: 26,
      height: 26,
    },
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
  titleWrap: {
    marginBottom: 5,
  },
  title: {
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

const AdCard = ({
  hit,
  style,
  thumbnail,
  thumbnailHeight,
  handleMouseEnter,
  handleMouseLeave,
  hovered,
  classes,
}) => (
  <div
    className={classes.root}
    style={style}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
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
          >
            <TouchDevice>
              {({ hide }) =>
                hovered &&
                hide(
                  <Paper
                    className={classes.favorite}
                    onClick={e => e.preventDefault()}
                  >
                    <FavoriteAd
                      className={classes.favoriteButton}
                      ad={hit}
                      adId={hit.objectID}
                    />
                  </Paper>,
                )
              }
            </TouchDevice>
          </CardMedia>
          <CardContent className={classes.content}>
            <div className={classes.titleWrap}>
              <AdTitle
                className={classes.title}
                component={Truncate}
                variant="subheading"
                ad={hit}
                lines={2}
                tagName="h3"
              />
            </div>
            <div className={classes.location}>
              <AdPlace ad={hit}>
                {({ place }) =>
                  place ? (
                    <Typography variant="caption" align="center">
                      {place}
                    </Typography>
                  ) : null
                }
              </AdPlace>
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
  withStateHandlers(
    {
      hovered: false,
    },
    {
      handleMouseEnter: () => () => ({
        hovered: true,
      }),
      handleMouseLeave: () => () => ({
        hovered: false,
      }),
    },
  ),
  withStyles(styles),
)(AdCard);
