import admin from 'firebase-admin';

export const get = () => admin.database.ServerValue.TIMESTAMP;

export const set = async (key, ref) => ref.child(key).set(get());
