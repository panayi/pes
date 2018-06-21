import React from 'react';
import * as R from 'ramda';
import { withProps, branch, renderNothing } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { connectData } from '../../../lib/connectData';
import requireUserToCallAction from '../../../hocs/requireUserToCallAction';
import { models, actions as dataActions } from '../../../store/firebase/data';
import { selectors as authSelectors } from '../../../store/firebase/auth';

const styles = theme => ({
  active: {
    color: theme.palette.primary.light,
  },
});

class FavoriteAd extends React.Component {
  state = {
    isFavorited: false,
  };

  componentDidMount() {
    this.maybeSetIsFavorited(this.props, {});
  }

  componentDidUpdate(prevProps) {
    this.maybeSetIsFavorited(prevProps, this.props);
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

export const isSellerSelector = createSelector(
  propSelector(['ad', 'seller']),
  propSelector(['uid']),
  authSelectors.uidSelector,
  (sellerId, currentUserIdFromProps, currentUserIdFromState) => {
    const currentUserId = currentUserIdFromProps || currentUserIdFromState;

    return sellerId && currentUserId && sellerId === currentUserId;
  },
);

const mapDataToProps = {
  favorite: models.favorites.oneObject(propSelector('adId')),
};

const mapStateToProps = createStructuredSelector({
  isSeller: isSellerSelector,
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
