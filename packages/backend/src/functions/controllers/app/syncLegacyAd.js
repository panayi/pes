/* @flow */
import { database } from 'lib/firebaseClient';
import { fetchAd, importAd } from 'services/legacy';

const syncLegacyAd = async (
  req: express$Request,
  res: express$Response,
  next: express$NextFunction,
) => {
  const { id, category }: { id: ID, category: ID } = req.params;

  // Return early, to unblock caller
  res.send('OK');
  next();

  const ad = await fetchAd(id, category);
  await importAd(ad, database);
};

export default syncLegacyAd;
