import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { branch } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import OpenModalOnBounce from '@pesposa/client-core/src/components/Modal/OpenModalOnBounce/OpenModalOnBounce';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import RateModal from './RateModal/RateModal';

const COOKIE_NAME = 'pesposa-rate-modal';
const DESKTOP_MIN_TIME_BEFORE_SHOW = 20 * 1000; // 20 seconds

const Rate = ({ canRate }) => (
  <React.Fragment>
    {canRate ? (
      <OpenModalOnBounce
        modalId="rate"
        cookieName={COOKIE_NAME}
        cookieExpire={2}
        timer={DESKTOP_MIN_TIME_BEFORE_SHOW}
      />
    ) : null}
    <ReduxModal id="rate" content={RateModal} />
  </React.Fragment>
);

const canRateSelector = createSelector(
  propSelector('currentUserId'),
  propSelector('rating'),
  R.useWith(R.and, [R.complement(isNilOrEmpty), isNilOrEmpty]),
);

const mapDataToProps = {
  rating: models.rating,
};

const mapStateToProps = createStructuredSelector({
  uid: authSelectors.uidSelector,
  canRate: canRateSelector,
});

export default R.compose(
  connect(mapStateToProps),
  branch(R.prop('uid'), connectData(mapDataToProps)),
)(Rate);
