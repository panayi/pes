import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps, branch, renderNothing } from 'recompose';
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
  icon: {
    fontSize: '32px',
  },
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
          <FavoriteIcon className={classNames(classes.icon, classes.active)} />
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

const mapDispatchToProps = {
  favoriteAd: dataActions.favoriteAd,
  unfavoriteAd: dataActions.unfavoriteAd,
};

export default R.compose(
  branch(dataSelectors.isSellerSelector, renderNothing),
  connectData(mapDataToProps, null, mapDispatchToProps),
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
