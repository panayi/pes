import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import withStyles from '@material-ui/core/styles/withStyles';
import { yellow } from '@material-ui/core/colors';
import StarIcon from '@material-ui/icons/Star';
import stringToHexColor from '@pesposa/core/src/utils/stringToHexColor';
import Imgix from '@pesposa/client-core/src/components/Imgix/Imgix';
import Truncate from '@pesposa/client-core/src/components/Truncate/Truncate';
import ScrollIntoView from 'components/ScrollIntoView';

const createOpacityTransition = theme =>
  theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.shortest,
  });

const styles = theme => ({
  container: {
    '&:hover $action': {
      opacity: 1,
    },
  },
  root: {
    position: 'relative',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  button: {
    textAlign: 'left',
    borderRadius: 0,
  },
  selected: {
    backgroundColor: theme.palette.divider,
  },
  avatar: {
    marginRight: 0,
    alignSelf: 'flex-start',
    opacity: 0,
    transition: createOpacityTransition(theme),
  },
  action: {
    opacity: 0,
    transition: createOpacityTransition(theme),
  },
  primaryPlaceholder: {
    display: 'block',
    height: '1.5em',
    backgroundColor: theme.palette.divider,
  },
  secondaryPlaceholder: {
    display: 'block',
    height: '0.83em',
    marginTop: '0.6em',
    backgroundColor: theme.palette.divider,
  },
  star: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 16,
    height: 16,
    color: theme.palette.grey[200],
  },
  starEnabled: {
    color: yellow[700],
  },
});

export class ScrollableListItem extends React.Component {
  renderAvatar() {
    const { placeholder, image, primary, firstCharacter } = this.props;

    if (placeholder) {
      return null;
    }

    return image ? (
      <Imgix image={image} params={{ w: 40 }}>
        {({ src }) => <Avatar src={src} />}
      </Imgix>
    ) : (
      <Avatar style={{ backgroundColor: `#${stringToHexColor(primary)}` }}>
        {firstCharacter}
      </Avatar>
    );
  }

  renderText() {
    const {
      placeholder,
      primary,
      secondary,
      withStar,
      starEnabled,
      classes,
    } = this.props;

    if (placeholder) {
      return (
        <ListItemText
          primary={<span className={classes.primaryPlaceholder}>&nbsp;</span>}
          secondary={
            <span className={classes.secondaryPlaceholder}>&nbsp;</span>
          }
        />
      );
    }

    return (
      <ListItemText
        primary={
          <React.Fragment>
            <Truncate lines={1}>{primary}</Truncate>
            {withStar && (
              <StarIcon
                className={classNames(classes.star, {
                  [classes.starEnabled]: starEnabled,
                })}
              />
            )}
          </React.Fragment>
        }
        secondary={<Truncate lines={1}>{secondary}</Truncate>}
      />
    );
  }

  renderAction() {
    const { placeholder, action, classes } = this.props;

    if (placeholder || !action) {
      return null;
    }

    return (
      <ListItemSecondaryAction className={classes.action}>
        {action}
      </ListItemSecondaryAction>
    );
  }

  render() {
    const {
      placeholder,
      selected,
      height,
      className,
      style,
      classes,
      component,
      onClick,
    } = this.props;
    const finalSelected = placeholder ? false : selected;

    return (
      <ScrollIntoView when={finalSelected}>
        <ListItem
          classes={{
            container: classes.container,
            root: classNames(
              classes.root,
              { [classes.selected]: finalSelected },
              className,
            ),
            button: classes.button,
          }}
          button
          divider
          disableRipple
          component={component}
          ContainerComponent="div"
          onClick={onClick}
          style={R.assoc('height', `${height}px`, style)}
        >
          {this.renderAvatar()}
          {this.renderText()}
          {this.renderAction()}
        </ListItem>
      </ScrollIntoView>
    );
  }
}

ScrollableListItem.propTypes = {
  placeholder: PropTypes.bool,
  selected: PropTypes.bool,
  primary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  image: PropTypes.shape({
    fullPath: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  style: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
  component: elementType,
  onClick: PropTypes.func,
  action: PropTypes.node,
};

ScrollableListItem.defaultProps = {
  placeholder: false,
  selected: false,
  primary: null,
  secondary: null,
  image: null,
  className: null,
  style: null,
  onClick: () => {},
  action: null,
  component: null,
};

const firstCharacterSelector = createSelector(
  propSelector('primary'),
  R.compose(
    R.toUpper,
    R.defaultTo(''),
    R.head,
    R.defaultTo(''),
  ),
);

export default R.compose(
  withProps(
    createStructuredSelector({
      firstCharacter: firstCharacterSelector,
    }),
  ),
  withRouter,
  withStyles(styles),
)(ScrollableListItem);
