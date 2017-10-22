import * as R from 'ramda';
import randomInt from 'utils/randomInt';

// getImageUrl :: Post -> String | Object | Nil
const getImage = R.compose(
  R.head,
  R.propOr([], 'images'),
);

const getPlaceholderImage = () => {
  const width = randomInt(1, 7) * 100;
  const height = randomInt(1, 7) * 100;

  return {
    image: `https://unsplash.it/${width}/${height}/?random`,
    style: {
      height,
    },
  };
};

export const getMediaProps = (post, { defaultHeight }) => {
  const image = getImage(post);

  if (R.is(Object, image)) {
    return image;
  }

  if (R.is(String, image)) {
    return {
      image,
      style: {
        height: defaultHeight,
      },
    };
  }

  return getPlaceholderImage();
};
