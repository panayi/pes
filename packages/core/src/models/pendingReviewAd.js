import * as R from 'ramda';
import { database } from '../config/firebaseClient';
import * as userModel from './user';

export const remove = async id =>
  database.ref(`/ads/pendingReview/${id}`).remove();

export const validate = async pendingReviewAd => {
  const { user: userId } = pendingReviewAd;
  const user = (await userModel.get(userId)).val();
  const userCountry = R.path(['location', 'address', 'country'], user);
  const adCountry = R.path(['location', 'address', 'country'], pendingReviewAd);

  // Disallow cross-country posting
  return adCountry === userCountry;
};
