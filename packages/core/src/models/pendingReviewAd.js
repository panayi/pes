/* @flow */
import { database } from '../config/firebaseClient';

export const remove = async (id: ID) =>
  database.ref(`/ads/pendingReview/${id}`).remove();
