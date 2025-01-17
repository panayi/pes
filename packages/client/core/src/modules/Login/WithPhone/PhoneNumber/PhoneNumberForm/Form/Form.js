import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { lifecycle } from 'recompose';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import withStyles from '@material-ui/core/styles/withStyles';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import MaskedInput from '../../../../../../components/MaskedInput/MaskedInput';
import CountrySelect from './CountrySelect/CountrySelect';

// type Props = {
//   handleSubmit: Function,
//   handleChange: Function,
//   handleBlur: Function,
//   values: Object,
//   errors: Object,
//   children: React$Node,
//   mask: Array<RegExp | String>,
//   classes: Object,
// };

const styles = theme => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down(theme.map.tablet)]: {
      flexWrap: 'wrap',
    },
  },
  formControl: {
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.down(theme.map.tablet)]: {
      width: '100%',
      marginBottom: theme.spacing.unit * 1.5,
    },
    '& + $formControl': {
      marginLeft: theme.spacing.unit,
      [theme.breakpoints.down(theme.map.tablet)]: {
        marginLeft: 0,
      },
    },
  },
  phoneInput: {
    flex: '1 1 auto',
  },
  input: {
    flex: 1,
  },
});

const Form = props => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    children,
    mask,
    classes,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.root}>
        <FormControl
          className={classes.formControl}
          error={R.has('countryCode', errors)}
        >
          <CountrySelect
            name="countryCode"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.countryCode}
            getLabel={country => `${country.name} (${country.callingCode})`}
          />
          {errors.countryCode && (
            <FormHelperText>{errors.countryCode}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          className={classNames(classes.formControl, classes.phoneInput)}
          error={R.has('number', errors)}
        >
          <MaskedInput
            className={classes.input}
            name="number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.number}
            placeholder="Your phone number"
            autoComplete="tel"
            type="tel"
            inputProps={{
              mask,
              inputMode: 'tel',
            }}
          />
          {errors.number && <FormHelperText>{errors.number}</FormHelperText>}
        </FormControl>
      </div>
      {children}
    </form>
  );
};

export default R.compose(
  lifecycle({
    componentDidUpdate(prevProps) {
      const { onChange } = this.props;

      if (!onChange) {
        return;
      }

      const valuesChanged = propsChanged(['values'], this.props, prevProps);

      if (valuesChanged) {
        onChange(this.props.values);
      }
    },
  }),
  withStyles(styles),
)(Form);
