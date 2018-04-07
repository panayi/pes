import React from 'react';
import * as R from 'ramda';
import { withProps, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import FavoriteIcon from 'material-ui-icons/Favorite';
import { connectData } from 'lib/connectData';
import requireUserToCallAction from 'hocs/requireUserToCallAction';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import {
  models,
  actions as dataActions,
  selectors as dataSelectors,
} from 'store/firebase/data';

const styles = theme => ({
  active: {
    color: theme.palette.primary.light,
  },
});

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

  render() {
    const { className, toggleFavorite, classes } = this.props;
    const { isFavorited } = this.state;

    return (
      <IconButton
        className={className}
        color="inherit"
        onClick={() => toggleFavorite(isFavorited, this.setIsFavorited)}
      >
        {isFavorited ? (
          <FavoriteIcon className={classes.active} />
        ) : (
          <FavoriteBorderIcon className={classes.icon} />
        )}
      </IconButton>
    );
  }
}

const mapDataToProps = {
  favorite: models.favorites.oneObject(propSelector('adId')),
};

const mapStateToProps = createStructuredSelector({
  isSeller: dataSelectors.isSellerSelector,
});

const mapDispatchToProps = {
  favoriteAd: dataActions.favoriteAd,
  unfavoriteAd: dataActions.unfavoriteAd,
};

export default R.compose(
  connectData(mapDataToProps, mapStateToProps, mapDispatchToProps),
  branch(R.prop('isSeller'), renderNothing),
  withProps(({ adId, favoriteAd, unfavoriteAd }) => ({
    toggleFavorite: (isFavorited, setIsFavorited) => {
      const action = isFavorited ? unfavoriteAd : favoriteAd;
      setIsFavorited(!isFavorited);
      action(adId);
    },
  })),
  requireUserToCallAction('toggleFavorite'),
  withStyles(styles),
)(FavoriteAd);
