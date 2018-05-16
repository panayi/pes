import { database } from '../config/firebaseClient';

export const remove = async id => database.ref(`/support/${id}`).remove();
