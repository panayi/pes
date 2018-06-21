import React from 'react';
import * as R from 'ramda';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@pesposa/client-core/src/components/Button/Button';
import LocationSelect from '../../../../components/LocationSelect/LocationSelect';

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
  select: {
    marginTop: theme.spacing.unit * 4,
  },
});

const Form = props => {
  const {
    buttonLabel,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    dirty,
    errors,
    classes,
  } = props;
  const nameError = R.path(['profile', 'name'], errors);
  const phoneError = R.path(['profile', 'phone'], errors);

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormGroup className={classes.form}>
        <TextField
          margin="dense"
          name="profile.name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.profile.name}
          label="Name"
          fullWidth
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          margin="dense"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          label="Email"
          error={R.has('email', errors)}
          helperText={errors.email}
        />
        <TextField
          margin="dense"
          name="profile.phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.profile.phone}
          label="Phone Number"
          error={!!phoneError}
          helperText={phoneError}
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
        <LocationSelect
          className={classes.select}
          value={values.location}
          onChange={value => setFieldValue('location', value, true)}
          error={errors.location}
        />
      </FormGroup>
      <div className={classes.actions}>
        <Button
          variant="raised"
          color="primary"
          type="submit"
          disabled={!dirty}
        >
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
};

export default withStyles(styles)(Form);
