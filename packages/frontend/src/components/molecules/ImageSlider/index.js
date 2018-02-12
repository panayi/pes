/* @flow */
import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import Slider from 'react-slick';
import { withStyles } from 'material-ui/styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Imgix from 'components/atoms/Imgix';
import ArrowButton from './ArrowButton';

type Props = {
  images: Array<Image>,
  imgixParams: Object,
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
          <Imgix image={image} params={imgixParams} />
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
