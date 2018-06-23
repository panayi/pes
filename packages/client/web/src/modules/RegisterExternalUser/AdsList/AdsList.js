import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { mapProps } from 'recompose';
import Slider from 'react-slick';
import withStyles from '@material-ui/core/styles/withStyles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '@pesposa/client-core/src/modules/ListAds/Masonry/Card/Card';

const styles = theme => ({
  root: {
    height: '100%',
    '& .slick-list': {
      height: '100%',
    },
    '& .slick-track': {
      height: '100%',
    },
    '& .slick-slide > div': {
      height: '100%',
    },
    '& .slick-dots': {
      display: 'flex',
      justifyContent: 'center',
      bottom: -28,
    },
    '& .slick-dots li': {
      margin: 0,
      padding: 0,
    },
    [theme.breakpoints.up(theme.map.laptop)]: {
      borderRadius: [theme.borderRadius.xl, 0, 0, theme.borderRadius.xl],
    },
  },
  ad: {
    pointerEvents: 'none',
  },
  arrow: {
    marginTop: -theme.spacing.unit * 5,
    fontSize: 36,
    '&:hover': {
      color: 'inherit',
    },
  },
  arrowPrev: {
    left: -50,
  },
  arrowNext: {
    right: -50,
  },
});

/* eslint-disable-next-line react/prefer-stateless-function */
const AdsList = props => {
  const { ads, onAdClick, className, children, classes, ...rest } = props;

  return (
    <Slider {...rest} className={classNames(classes.root, className)}>
      {R.map(
        ad => (
          <div key={ad.id}>
            <Card
              hit={{ ...ad, onClick: onAdClick }}
              columnWidth={300}
              fixedCardHeight={400}
            />
            {children ? children(ad) : null}
          </div>
        ),
        ads,
      )}
    </Slider>
  );
};

const arrowHoc = direction =>
  R.compose(
    withStyles(styles),
    mapProps(({ className, style, onClick, classes }) => ({
      color: 'secondary',
      className: classNames(
        className,
        classes.arrow,
        classes[`arrow${direction}`],
      ),
      style,
      onClick,
    })),
  );

const PrevArrow = arrowHoc('Prev')(KeyboardArrowLeft);
const NextArrow = arrowHoc('Next')(KeyboardArrowRight);

AdsList.defaultProps = {
  ads: [],
  autoplay: false,
  arrows: true,
  infinite: true,
  dots: false,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

export default withStyles(styles)(AdsList);
