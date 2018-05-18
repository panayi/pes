import { database } from '../config/firebaseClient';

export const getAll = async () => database.ref(`/categories`).once('value');
