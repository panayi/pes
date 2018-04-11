import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import renderNothingWhen from 'hocs/renderNothingWhen';
import OpenModalOnBounce from 'components/Modal/OpenModalOnBounce/OpenModalOnBounce';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import RateModal from './RateModal/RateModal';

const COOKIE_NAME = 'pesposa-rate-modal';
const DESKTOP_MIN_TIME_BEFORE_SHOW = 50 * 1000; // 50 seconds

const Rate = () => (
  <React.Fragment>
    <OpenModalOnBounce
      modalId="rate"
      cookieName={COOKIE_NAME}
      cookieExpire={2}
      timer={DESKTOP_MIN_TIME_BEFORE_SHOW}
    />
    <ReduxModal id="rate" content={RateModal} />
  </React.Fragment>
);

const mapDataToProps = {
  rating: models.rating,
};

export default R.compose(
  connectData(mapDataToProps),
  renderNothingWhen(
    R.either(
      R.propSatisfies(isNilOrEmpty, 'currentUserId'),
      R.propSatisfies(R.complement(isNilOrEmpty), 'rating'),
    ),
  ),
)(Rate);
