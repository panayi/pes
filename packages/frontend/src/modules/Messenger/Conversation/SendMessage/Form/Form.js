import React from 'react';
import PropTypes from 'prop-types';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    height: 47,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: '100%',
    border: [1, 'solid', theme.palette.grey[100]],
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: [
      theme.spacing.unit,
      123,
      theme.spacing.unit,
      theme.spacing.unit * 1.5,
    ],
    background: theme.palette.grey[100],
    color: theme.palette.text.secondary,
  },
  button: {
    position: 'absolute',
    top: 4,
    right: 4,
    height: 40,
    minHeight: 30,
    borderRadius: '100em',
    boxShadow: 'none',
    fontSize: '16px',
    transition: 'background-color 0.25s ease',
  },
});

const Form = props => {
  const { values, handleSubmit, handleChange, handleBlur, classes } = props;

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Input
        name="body"
        value={values.body}
        onChange={handleChange}
        onBlur={handleBlur}
        className={classes.input}
        placeholder="Ask a question"
        disableUnderline
        autoComplete="off"
      />
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
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Form);
