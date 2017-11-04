import * as functions from 'firebase-functions';
import express from 'express';
import fetchPost from 'legacy/fetchPost';
import importPost from 'legacy/importPost';
import { database } from '../lib/firebaseClient';

const app = express();

const syncPost = async (req, res, next) => {
  const { id, category } = req.params;

  // Return early, to unblock caller
  res.send('OK');
  next();

  const post = await fetchPost(id, category);
  await importPost(post, database);
};

app.get('/:category/:id', syncPost);

export default functions.https.onRequest(app);
