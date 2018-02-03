/* @flow */
import { database } from 'lib/firebaseClient';

export const remove = async (id: ID) =>
  database.ref(`/ads/pendingReview/${id}`).remove();
