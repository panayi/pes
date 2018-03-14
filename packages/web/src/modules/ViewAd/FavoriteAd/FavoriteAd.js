import React from 'react';
import * as R from 'ramda';
import { branch, renderNothing } from 'recompose';
import IconButton from 'material-ui/IconButton';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import FavoriteIcon from 'material-ui-icons/Favorite';
import { connectData } from 'lib/connectData';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import {
  models,
  actions as dataActions,
  selectors as dataSelectors,
} from 'store/firebase/data';

class FavoriteAd extends React.Component {
  state = {
    isFavorited: false,
  };

  componentWillMount() {
    this.maybeSetIsFavorited(this.props, {});
  }

  componentWillReceiveProps(nextProps) {
    this.maybeSetIsFavorited(nextProps, this.props);
  }

  setIsFavorited = value => {
    this.setState({
      isFavorited: value,
    });
  };

  maybeSetIsFavorited(nextProps, props) {
    if (propsChanged(['favorite'], nextProps, props)) {
      this.setIsFavorited(!!nextProps.favorite);
    }
  }

  handleClick = () => {
    const { adId, favoriteAd, unfavoriteAd } = this.props;
    const { isFavorited } = this.state;
    const action = isFavorited ? unfavoriteAd : favoriteAd;

    this.setIsFavorited(!isFavorited);
    action(adId);
  };

  render() {
    const { className } = this.props;
    const { isFavorited } = this.state;

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
  branch(dataSelectors.isSellerSelector, renderNothing),
  connectData(mapDataToProps, null, mapDispatchToProps),
)(FavoriteAd);
