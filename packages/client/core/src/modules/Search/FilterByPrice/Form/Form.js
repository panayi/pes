import React, { Component } from 'react';
import { noop } from 'ramda-adjunct';
import withStyles from '@material-ui/core/styles/withStyles';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import PriceTextField from '../../../../components/PriceTextField/PriceTextField';

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

class Form extends Component {
  componentDidUpdate(prevProps) {
    if (propsChanged(['values'], prevProps, this.props)) {
      const { handleSubmit } = this.props;
      handleSubmit({ preventDefault: noop });
    }
  }

  render() {
    const {
      values,
      handleSubmit,
      setFieldValue,
      handleBlur,
      classes,
    } = this.props;

    return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <PriceTextField
          className={classes.input}
          name="min"
          setFieldValue={setFieldValue}
          onBlur={handleBlur}
          value={values.min}
          placeholder="€ min"
          margin="none"
        />
        <PriceTextField
          className={classes.input}
          name="max"
          setFieldValue={setFieldValue}
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
