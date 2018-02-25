import React, { Component } from 'react';
import * as R from 'ramda';
import { FormGroup } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import { propsChanged } from 'pesposa-utils';

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
          label="Price"
          error={R.has('price', errors)}
          helperText={errors.price}
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
          {R.map(
            category => (
              <option key={category.key} value={category.key}>
                {category.key}
              </option>
            ),
            categories,
          )}
        </TextField>
      </FormGroup>
    );
  }
}

export default withStyles(styles)(Form);
