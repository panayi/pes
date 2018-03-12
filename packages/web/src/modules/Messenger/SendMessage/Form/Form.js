import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import Button from 'components/Button/Button';

const styles = theme => ({
  root: {
    width: '100%',
    height: 47,
    position: 'relative',
    display: 'flex',
  },
  input: {
    boxSizing: 'border-box',
    padding: [theme.spacing.unit, theme.spacing.unit * 1.5],
  },
  action: {
    textTransform: 'none',
  },
  box: {
    '& $input': {
      flex: 1,
    },
  },
  float: {
    '& $input': {
      width: '100%',
      height: '100%',
      border: [1, 'solid', theme.palette.grey[100]],
      borderRadius: 100,
      position: 'absolute',
      top: 0,
      right: 0,
      paddingRight: 123,
      background: theme.palette.grey[100],
      color: theme.palette.text.primary,
    },
    '& $action': {
      position: 'absolute',
      top: 4,
      right: 4,
    },
  },
  button: {
    height: 40,
    minHeight: 30,
    borderRadius: '100em',
    boxShadow: 'none',
    fontSize: '16px',
    transition: 'background-color 0.25s ease',
  },
});

const Form = props => {
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    placeholder,
    variant,
    action,
    classes,
  } = props;
  const isFloatVariant = variant === 'float';

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(classes.root, classes[variant])}
    >
      <Input
        name="body"
        value={values.body}
        onChange={handleChange}
        onBlur={handleBlur}
        className={classes.input}
        placeholder={placeholder}
        disableUnderline
        autoComplete="off"
      />
      <div className={classes.action}>
        {action ||
          (isFloatVariant && (
            <Button
              type="submit"
              className={classes.button}
              color="primary"
              variant="raised"
              disableRipple
              disableFocusRipple
            >
              Send
            </Button>
          ))}
      </div>
    </form>
  );
};

Form.propTypes = {
  values: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['float', 'box']).isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Form);
