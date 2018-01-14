import { database } from 'lib/firebaseClient';

export const remove = async id =>
  database.ref(`/ads/pendingReview/${id}`).remove();
