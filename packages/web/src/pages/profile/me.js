import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { selectors as authSelectors } from 'store/firebase/auth';
import needsUser from 'hocs/needsUser';

const MyProfile = R.always(null);

const mapStateToProps = createStructuredSelector({
  uid: authSelectors.uidSelector,
});

export default R.compose(
  needsUser(),
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      const { uid, history } = this.props;
      const tab = R.path(['match', 'params', 'tab'], this.props);

      let nextPath;

      if (uid && tab) {
        nextPath = `/user/${uid}/${tab}`;
      } else if (uid) {
        nextPath = `/user/${uid}`;
      } else {
        nextPath = '/';
      }

      history.replace(nextPath);
    },
  }),
)(MyProfile);
