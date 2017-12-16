import * as functions from 'firebase-functions';
import express from 'express';
import fetchAd from 'legacy/fetchAd';
import importAd from 'legacy/importAd';
import { database } from '../lib/firebaseClient';

const app = express();

const syncAd = async (req, res, next) => {
  const { id, category } = req.params;

  // Return early, to unblock caller
  res.send('OK');
  next();

  const ad = await fetchAd(id, category);
  await importAd(ad, database);
};

app.get('/:category/:id', syncAd);

export default functions.https.onRequest(app);
