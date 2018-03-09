import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { ListItem } from 'material-ui/List';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import CheckIcon from 'material-ui-icons/Check';
import Link from 'components/Link/Link';

const styles = theme => ({
  item: {
    padding: 0,
    '& + &': {
      paddingTop: theme.spacing.unit / 2,
    },
  },
  button: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    width: '100%',
    minHeight: 'auto',
    padding: 0,
    fontWeight: theme.typography.fontWeightRegular,
    textTransform: 'none',
    '&:hover': {
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: 'transparent',
    },
  },
  label: {
    flex: 1,
  },
  icon: {
    visibility: 'hidden',
    width: 13,
    height: 13,
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      visibility: 'visible',
    },
  },
});

const FilterOption = ({
  buttonComponent: ButtonComponent,
  buttonProps,
  active,
  children,
  classes,
}) => {
  const finalButtonProps =
    ButtonComponent === Link
      ? R.merge(buttonProps, {
          className: classes.button,
          activeClassName: classes.active,
        })
      : R.merge(buttonProps, {
          className: classNames(classes.button, { [classes.active]: active }),
        });

  return (
    <ListItem classes={{ root: classes.item }} dense>
      <ButtonComponent disableRipple {...finalButtonProps}>
        <span className={classes.label}>{children}</span>
        <span>
          <CheckIcon className={classes.icon} />
        </span>
      </ButtonComponent>
    </ListItem>
  );
};

FilterOption.defaultProps = {
  buttonComponent: Button,
};

export default withStyles(styles)(FilterOption);
