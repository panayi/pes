import React from 'react';
import * as R from 'ramda';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@pesposa/client-core/src/components/Button/Button';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    flex: 1,
    padding: theme.spacing.unit * 2,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 64,
    padding: theme.spacing.unit * 2,
    borderTop: [1, 'solid', theme.palette.divider],
  },
});

const Form = props => {
  const {
    buttonLabel,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    classes,
  } = props;

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormGroup className={classes.form}>
        <TextField
          margin="dense"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          label="Name"
          fullWidth
          error={R.has('name', errors)}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          name="url"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.url}
          label="URL"
          error={R.has('url', errors)}
          helperText={errors.url}
        />
      </FormGroup>
      <div className={classes.actions}>
        <Button variant="raised" color="primary" type="submit">
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
};

export default withStyles(styles)(Form);
