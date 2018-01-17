import * as R from 'ramda';
import { lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors as authSelectors } from 'store/auth';
import { actions as profileActions } from 'store/profile';

const mapStateToProps = createStructuredSelector({
  hasUid: authSelectors.hasUidSelector,
});

const mapDispatchToProps = {
  setCurrentUserIp: profileActions.setCurrentUserIp,
};

const maybeSetCurrentUserIp = async props => {
  const { hasUid, setCurrentUserIp } = props;

  if (!hasUid) {
    return null;
  }

  return setCurrentUserIp();
};

const setCurrentUserIp = R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      maybeSetCurrentUserIp(this.props);
    },
    componentDidUpdate(prevProps) {
      const previouslyHadUid = prevProps.hasUid;
      if (!previouslyHadUid) {
        maybeSetCurrentUserIp(this.props);
      }
    },
  }),
);

export default setCurrentUserIp;
