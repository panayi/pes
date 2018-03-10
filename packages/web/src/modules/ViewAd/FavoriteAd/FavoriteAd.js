import React from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import IconButton from 'material-ui/IconButton';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import FavoriteIcon from 'material-ui-icons/Favorite';
import { connectData } from 'lib/connectData';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { models, actions as dataActions } from 'store/firebase/data';

class FavoriteAd extends React.Component {
  static maybeSetIsFavorited(nextProps, props) {
    if (propsChanged(['favorite'], nextProps, props)) {
      nextProps.setIsFavorited(!!nextProps.favorite);
    }
  }

  componentWillMount() {
    FavoriteAd.maybeSetIsFavorited(this.props, {});
  }

  componentWillReceiveProps(nextProps) {
    FavoriteAd.maybeSetIsFavorited(nextProps, this.props);
  }

  handleClick = () => {
    const {
      adId,
      isFavorited,
      setIsFavorited,
      favoriteAd,
      unfavoriteAd,
    } = this.props;
    const action = isFavorited ? unfavoriteAd : favoriteAd;

    setIsFavorited(!isFavorited);
    action(adId);
  };

  render() {
    const { isFavorited, className } = this.props;

    return (
      <IconButton
        className={className}
        color="inherit"
        onClick={this.handleClick}
      >
        {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    );
  }
}

const mapDataToProps = {
  favorite: models.favorites.oneObject(propSelector('adId')),
};

const mapDispatchToProps = {
  favoriteAd: dataActions.favoriteAd,
  unfavoriteAd: dataActions.unfavoriteAd,
};

export default R.compose(
  withState('isFavorited', 'setIsFavorited', false),
  connectData(mapDataToProps, null, mapDispatchToProps),
)(FavoriteAd);
