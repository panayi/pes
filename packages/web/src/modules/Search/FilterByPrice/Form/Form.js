import React, { Component } from 'react';
import { noop } from 'ramda-adjunct';
import TextField from 'material-ui/TextField';
import withStyles from 'material-ui/styles/withStyles';
import propsChanged from '@pesposa/core/src/utils/propsChanged';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  label: {
    width: 30,
    marginRight: 2 * theme.spacing.unit,
    alignSelf: 'flex-end',
  },
  input: {
    flex: '1 1 auto', // Fix IE11
    '& + &': {
      marginLeft: theme.spacing.unit,
    },
  },
});

class Form extends Component<Props> {
  componentWillReceiveProps(nextProps) {
    if (propsChanged(['values'], this.props, nextProps)) {
      this.props.handleSubmit({ preventDefault: noop });
    }
  }

  render() {
    const {
      values,
      handleSubmit,
      handleChange,
      handleBlur,
      classes,
    } = this.props;

    return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          name="min"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.min}
          placeholder="€ min"
          margin="none"
        />
        <TextField
          className={classes.input}
          name="max"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.max}
          placeholder="€ max"
          margin="none"
        />
      </form>
    );
  }
}

export default withStyles(styles)(Form);
