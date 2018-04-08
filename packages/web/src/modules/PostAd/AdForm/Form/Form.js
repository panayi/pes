import React, { Component } from 'react';
import * as R from 'ramda';
import { FormGroup } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import withStyles from 'material-ui/styles/withStyles';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import translate from 'hocs/translate';

const styles = theme => ({
  select: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Form extends Component {
  componentWillReceiveProps(nextProps) {
    if (propsChanged(['values'], this.props, nextProps)) {
      this.props.onChange(nextProps.values);
    }
  }

  render() {
    const {
      categories,
      handleChange,
      handleBlur,
      values,
      errors,
      t,
      classes,
    } = this.props;

    return (
      <FormGroup>
        <TextField
          margin="dense"
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          label="What are you selling?"
          fullWidth
          error={R.has('title', errors)}
          helperText={errors.title}
        />
        <TextField
          margin="dense"
          name="body"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.body}
          label="Please write a short description"
          type="textarea"
          error={R.has('body', errors)}
          helperText={errors.body}
        />
        <TextField
          margin="dense"
          name="price"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price}
          label="Price (EUR)" // TODO: shouldn't be hard-coded, but based on user location
          error={R.has('price', errors)}
          helperText={errors.price}
          type="number"
        />
        <TextField
          className={classes.select}
          margin="normal"
          name="category"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.category}
          select
          SelectProps={{ native: true }}
          error={R.has('category', errors)}
          helperText={errors.category}
        >
          <option value="">Select category</option>
          {R.compose(
            R.map(category => (
              <option key={category.id} value={category.id}>
                {t(category.id)}
              </option>
            )),
            R.values,
            R.sortBy(R.prop('order')),
            R.defaultTo([]),
          )(categories)}
        </TextField>
      </FormGroup>
    );
  }
}

export default R.compose(translate('categories'), withStyles(styles))(Form);
