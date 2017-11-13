import * as R from 'ramda';
import randomInt from 'utils/randomInt';

// Cache dimensions, to avoid changing
// when component re-renders
const mapIdToDimensions = {};

// getImageUrl :: Post -> String | Object | Nil
const getImage = R.compose(
  R.head,
  R.propOr([], 'images'),
);

// getDimensions :: Id -> { width, height }
//   Id = String | Number
const getDimensions = id => R.compose(
  R.when(
    R.isNil,
    () => {
      const dimensions = {
        width: randomInt(2, 7) * 100,
        height: randomInt(2, 7) * 100,
      };
      mapIdToDimensions[id] = dimensions;
      return dimensions;
    },
  ),
  R.prop(R.__, mapIdToDimensions),
)(id);

// getPlaceholderImage :: Id -> Object
const getPlaceholderImage = (id) => {
  const { width, height } = getDimensions(id);

  return {
    image: `https://unsplash.it/${width}/${height}/?random`,
    style: {
      height,
    },
  };
};

// getMediaProps :: Post, Object -> Object
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

  return getPlaceholderImage(post.objectID);
};
