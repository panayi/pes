import * as functions from 'firebase-functions';
import express from 'express';
import { database } from 'lib/firebaseClient';
import { fetchAd, importAd } from 'services/legacy';

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
