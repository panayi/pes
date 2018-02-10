import React from 'react';
import { Control, Form } from 'react-redux-form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import { constants as priceConstants } from 'store/search/price';

const styles = theme => ({
  form: {
    display: 'flex',
  },
  label: {
    width: 30,
    marginRight: 2 * theme.spacing.unit,
    alignSelf: 'flex-end',
  },
  input: {
    '& + &': {
      marginLeft: theme.spacing.unit,
    },
  },
});

const FilterByPrice = ({ classes }) => (
  <Form className={classes.form} model={priceConstants.MODEL_PATH}>
    <Control.text
      model=".min"
      id="min"
      placeholder="€ min"
      component={TextField}
      className={classes.input}
      margin="none"
    />
    <Control.text
      model=".max"
      id="max"
      placeholder="€ max"
      component={TextField}
      className={classes.input}
      margin="none"
    />
  </Form>
);

export default withStyles(styles)(FilterByPrice);
