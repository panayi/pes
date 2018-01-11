/* @flow */
import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import Slider from 'react-slick';
import { withStyles } from 'material-ui';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowButton from './ArrowButton';

type Props = {
  images: Array<string>,
  className: ?string,
  classes: Object,
};

const styles = theme => ({
  root: {
    overflow: 'hidden',
    backgroundColor: theme.palette.common.black,
    '& .slick-track': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
});

const ImageSlider = ({ images, className, classes, ...rest }: Props) => (
  <Slider {...rest} className={classNames(classes.root, className)}>
    {R.map(
      src => (
        <div key={src} className={classes.imgContainer}>
          <img className={classes.img} src={src} alt="" />
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