import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withProps } from 'recompose';
import TextField from '@material-ui/core/TextField';
import omitProps from '../../utils/omitProps';

const PriceTextField = R.compose(
  withProps(({ name, value, setFieldValue }) => ({
    type: 'number',
    inputProps: {
      inputMode: 'numeric',
      pattern: '[0-9]*',
    },
    value: isNilOrEmpty(value) ? '' : value,
    onChange: event => {
      const newValue = R.path(['target', 'value'], event);
      const finalNewValue = isNilOrEmpty(newValue)
        ? null
        : parseFloat(newValue);
      setFieldValue(name, finalNewValue);
    },
  })),
  omitProps(['setFieldValue']),
)(TextField);

export default PriceTextField;
