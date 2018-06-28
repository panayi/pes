import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps, withStateHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import TouchDevice from '../../../../components/TouchDevice/TouchDevice';
import FavoriteAd from '../../../Ad/FavoriteAd/FavoriteAd';
import Imgix from '../../../../components/Imgix/Imgix';
import AdTitle from '../../../Ad/AdTitle/AdTitle';
import AdPlace from '../../../Ad/AdPlace/AdPlace';
import AdDistance from '../../../Ad/AdDistance/AdDistance';
import LinkToAd from '../../../Ad/LinkToAd/LinkToAd';
import * as constants from '../../constants';
import * as selectors from '../../selectors';
import BaseCard from '../BaseCard/BaseCard';

const styles = theme => ({
  root: {
    display: 'flex',
    cursor: 'pointer',
  },
  media: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    margin: [4, 4, 0, 4],
    width: 'calc(100% - 8px)',
    borderRadius: 6,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background:
      'linear-gradient(rgba(80, 80, 80, 0), rgba(80, 80, 80, 0.2) 70%, rgba(80, 80, 80, 0.5))',
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
    padding: `0 ${theme.spacing.unit}px !important`,
    height: constants.CARD_CONTENT_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  titleWrap: {
    width: '100%',
    marginBottom: 6,
  },
  title: {
    textAlign: 'center',
    lineHeight: '1.2em',
    webkitLineClamp: 2,
    maxHeight: 38,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  location: {
    display: 'flex',
    justifyContent: 'center',
  },
  distance: {
    paddingLeft: theme.spacing.unit,
    display: 'none',
    [theme.breakpoints.up(theme.map.tablet)]: {
      display: 'block',
    },
  },
});

const AdLink = withProps({ component: Link })(LinkToAd);

const AdCard = ({
  hit,
  style,
  thumbnail,
  thumbnailHeight,
  linkProps,
  handleMouseEnter,
  handleMouseLeave,
  hovered,
  className,
  classes,
}) => (
  <div
    className={classNames(classes.root, className)}
    style={style}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <Imgix params={constants.IMGIX_PARAMS} image={thumbnail}>
      {({ src }) => (
        <BaseCard
          ad={hit}
          component={hit.onClick ? undefined : AdLink}
          onClick={hit.onClick}
          {...linkProps}
        >
          <CardMedia
            className={classes.media}
            image={src}
            style={{ height: `${thumbnailHeight}px` }}
          >
            <TouchDevice>
              {({ hide }) =>
                hovered && (
                  <React.Fragment>
                    <div className={classes.overlay} />
                    {hide(
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
                    )}
                  </React.Fragment>
                )
              }
            </TouchDevice>
          </CardMedia>
          <CardContent className={classes.content}>
            <div className={classes.titleWrap}>
              <AdTitle
                className={classes.title}
                variant="subheading"
                ad={hit}
                component="h3"
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
        </BaseCard>
      )}
    </Imgix>
  </div>
);

AdCard.propTypes = {
  hit: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({}),
  thumbnail: PropTypes.shape({}).isRequired,
  thumbnailHeight: PropTypes.number.isRequired,
  linkProps: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
};

AdCard.defaultProps = {
  style: null,
  linkProps: {},
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
