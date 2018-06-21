import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import Slider from 'react-slick';
import withStyles from '@material-ui/core/styles/withStyles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import Imgix from '@pesposa/client-core/src/components/Imgix/Imgix';
import ArrowButton from './ArrowButton/ArrowButton';

// type Props = {
//   images: Array<Image>,
//   imgixParams: Object,
//   flex: ?boolean,
//   cover: ?boolean,
//   className: ?string,
//   classes: Object,
// };

const styles = theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.secondary.dark,
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
  desktop: {
    overflow: 'hidden',
    '& .slick-track': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .slick-slide': {
      minHeight: 'auto',
    },
  },
  imgContainer: {
    width: '100%',
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
    flexBasis: 0,
  },
  landscape: {
    width: '100%',
    height: 'auto',
  },
  cover: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    flex: '0 0 auto',
  },
});

class ImageSlider extends React.Component {
  componentDidUpdate(prevProps) {
    if (propsChanged(['images'], prevProps, this.props)) {
      this.slider.slickGoTo(0);
    }
  }

  render() {
    const {
      images,
      imgixParams,
      flex,
      cover,
      className,
      classes,
      ...rest
    } = this.props;

    return (
      <Slider
        {...rest}
        className={classNames(
          classes.root,
          { [classes.desktop]: flex },
          className,
        )}
        ref={slider => {
          this.slider = slider;
        }}
      >
        {R.map(
          image =>
            flex ? (
              <div key={image.fullPath} className={classes.imgContainer}>
                <div className={classes.imgContainerInner}>
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
            ) : (
              <Imgix
                key={image.fullPath}
                className={classNames({ [classes.cover]: cover })}
                image={image}
                params={imgixParams}
              />
            ),
          images,
        )}
      </Slider>
    );
  }
}

ImageSlider.defaultProps = {
  images: [],
  autoplay: false,
  arrows: true,
  infinite: false,
  dots: false,
  prevArrow: <ArrowButton.prev />,
  nextArrow: <ArrowButton.next />,
};

export default withStyles(styles)(ImageSlider);
