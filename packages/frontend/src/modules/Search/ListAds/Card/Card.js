import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import id from 'utils/id';
import LineClamp from 'components/LineClamp/LineClamp';
import Imgix from 'components/Imgix/Imgix';
import AdTitle from 'components/AdTitle/AdTitle';
import AdPrice from 'components/AdPrice/AdPrice';
import AdAddress from 'components/AdAddress/AdAddress';
import AdDistance from 'components/AdDistance/AdDistance';
import * as constants from '../constants';
import * as selectors from '../selectors';

const styles = theme => ({
  root: {
    display: 'flex',
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
  price: {
    padding: theme.spacing.unit,
  },
  header: {
    padding: theme.spacing.unit,
    height: constants.CARD_HEADER_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'hidden',
    textAlign: 'center',
  },
  content: {
    padding: 0,
    height: constants.CARD_CONTENT_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: theme.typography.subheading.fontSize,
  },
});

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
          component={Link}
          to={`/i/${id(hit)}`}
        >
          <CardMedia
            className={classes.media}
            image={src}
            style={{ height: `${thumbnailHeight}px` }}
          >
            <AdPrice
              className={classes.price}
              color="secondary"
              variant="title"
              ad={hit}
            />
          </CardMedia>
          <CardHeader
            className={classes.header}
            classes={{
              title: classes.headerTitle,
            }}
            title={
              <AdTitle
                component={LineClamp}
                variant="subheading"
                ad={hit}
                lines={2}
                height={48}
                tagName="h3"
              />
            }
            subheader=""
          />
          <CardContent className={classes.content}>
            <AdAddress ad={hit} variant="caption" align="center" />
            <AdDistance ad={hit} variant="caption" align="center" />
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
