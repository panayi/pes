import fetch from 'node-fetch';
import { getPostUrl } from './urls';

export default async (id, category) => {
  const response = await fetch(getPostUrl(id, category));
  const post = await response.json();

  return post;
};
