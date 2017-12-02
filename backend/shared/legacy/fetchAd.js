import fetch from 'node-fetch';
import { getAdUrl } from './urls';

export default async (id, category) => {
  const response = await fetch(getAdUrl(id, category));
  const ad = await response.json();

  return ad;
};
