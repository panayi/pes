/* @flow */
import { database } from '../config/firebaseClient';

export const get = async (countryCode: string) =>
  database.ref(`/countries/${countryCode}`).once('value');

export const getDefault = async () =>
  database
    .ref('/countries')
    .orderByChild('default')
    .equalTo(true)
    .once('value');