import { withProps } from 'recompose';
import TextField from 'material-ui/TextField';

const PriceTextField = withProps({
  type: 'number',
  inputProps: {
    inputMode: 'numeric',
    pattern: '[0-9]*',
  },
})(TextField);

export default PriceTextField;
