import classNames from 'classnames';
import { withProps } from 'recompose';
import Button from 'components/Button/Button';

const WaitlistedJoinButton = withProps(({ className, ...rest }) => ({
  className: classNames(className, 'join-waitlist'),
  ...rest,
}))(Button);

export default WaitlistedJoinButton;
