/* @flow */
import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import Slider from 'react-slick';
import { withStyles } from 'material-ui/styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Imgix from 'components/Imgix/Imgix';
import ArrowButton from './ArrowButton/ArrowButton';

type Props = {
  images: Array<Image>,
  imgixParams: Object,
  className: ?string,
  classes: Object,
};

const styles = theme => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.common.black,
    '& .slick-list': {
      height: '100%',
    },
    '& .slick-track': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    '& .slick-slide': {
      minHeight: 'auto',
    },
  },
  imgContainer: {
    width: 500,
    height: '100%',
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imgContainerInner: {
    width: '100%',
    height: '100%',
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
  },
  portrait: {
    width: 'auto',
    height: '100%',
    flex: 0,
  },
  landscape: {
    width: '100%',
    height: 'auto',
  },
});

const ImageSlider = ({
  images,
  imgixParams,
  className,
  classes,
  ...rest
}: Props) => (
  <Slider {...rest} className={classNames(classes.root, className)}>
    {R.map(
      image => (
        <div key={image.fullPath} className={classes.imgContainer}>
          <div key={image.fullPath} className={classes.imgContainerInner}>
            <Imgix
              className={
                image.dimensions &&
                image.dimensions.height > image.dimensions.width
                  ? classes.portrait
                  : classes.landscape
              }
              image={image}
              params={imgixParams}
            />
          </div>
        </div>
      ),
      images,
    )}
  </Slider>
);

ImageSlider.defaultProps = {
  images: [],
  autoplay: false,
  arrows: true,
  dots: false,
  prevArrow: <ArrowButton.prev />,
  nextArrow: <ArrowButton.next />,
};

export default withStyles(styles)(ImageSlider);
