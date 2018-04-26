import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector, createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import OpenModalOnBounce from 'components/Modal/OpenModalOnBounce/OpenModalOnBounce';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import RateModal from './RateModal/RateModal';

const COOKIE_NAME = 'pesposa-rate-modal';
const DESKTOP_MIN_TIME_BEFORE_SHOW = 50 * 1000; // 50 seconds

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
  canRate: canRateSelector,
});

export default connectData(mapDataToProps, mapStateToProps)(Rate);
