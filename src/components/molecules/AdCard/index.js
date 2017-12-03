/* @flow */
import React from 'react';
import {
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  withStyles,
} from 'material-ui';
import { Link } from 'react-router-dom';
import AdPrice from 'components/atoms/AdPrice';
import AdAddress from 'components/atoms/AdAddress';
import AdDate from 'components/atoms/AdDate';
import { getMediaProps } from './utils';

type Props = {
  ad: Ad,
  width: Number,
  classes: Object,
};

const DEFAULT_MEDIA_HEIGHT = 200;
const HEADER_HEIGHT = 60;
const CONTENT_HEIGHT = 40;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  ad: {
    textDecoration: 'none',
  },
  adPaperRoot: {
    borderRadius: theme.custom.borderRadius.xl,
  },
  media: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderRadius: `${theme.custom.borderRadius.xl}px ${
      theme.custom.borderRadius.xl
    }px 0 0`,
  },
  price: {
    padding: theme.spacing.unit,
  },
  header: {
    padding: theme.spacing.unit,
    height: HEADER_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'hidden',
    textAlign: 'center',
  },
  content: {
    padding: 0,
    height: CONTENT_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: theme.typography.subheading.fontSize,
  },
});

const AdCard = ({ ad, width, classes }: Props) => {
  const mediaProps = getMediaProps(ad, {
    defaultHeight: DEFAULT_MEDIA_HEIGHT,
  });
  const totalHeight = mediaProps.style.height + HEADER_HEIGHT + CONTENT_HEIGHT;

  return (
    <div
      className={classes.root}
      style={{ width: `${width}px`, height: `${totalHeight}px` }}
    >
      <Card
        className={classes.ad}
        classes={{
          root: classes.adPaperRoot,
        }}
        style={{ width }}
        elevation={1}
        component={Link}
        to={`/i/${ad.objectID}`}
      >
        <CardMedia
          className={classes.media}
          title={ad.title}
          {...getMediaProps(ad, { defaultHeight: DEFAULT_MEDIA_HEIGHT })}
        >
          <AdPrice
            className={classes.price}
            color="accent"
            type="title"
            ad={ad}
          />
        </CardMedia>
        <CardHeader
          className={classes.header}
          classes={{
            title: classes.headerTitle,
          }}
          title={ad.title}
        />
        <CardContent className={classes.content}>
          <AdAddress ad={ad} type="caption" align="center" />
          <AdDate ad={ad} type="caption" align="center" />
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(AdCard);
