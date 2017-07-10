import base, { app } from '../lib/api/rebase';

const auth = app.auth();

export const saveUser = user =>
  base
    .post(`users/${user.uid}/info`, {
      data: {
        email: user.email,
        uid: user.uid,
      },
    })
    .then(() => user);

export const register = (email, pw) =>
  auth
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser);

export const logout = () => auth().signOut();

export const login = (email, pw) =>
  auth.signInWithEmailAndPassword(email, pw);

export const resetPassword = email =>
  auth.sendPasswordResetEmail(email);
