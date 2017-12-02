import * as R from 'ramda';
import fetch from 'node-fetch';
import log from 'helpers/log';
import importPost from 'legacy/importPost';
import { POSTS_ENDPOINT } from 'legacy/urls';
import { database } from '../../lib/firebaseClient';

const sequentialImportPost = async (index, posts) => {
  const post = posts[index];
  await importPost(post, database);
  log.info(`Firebase: Synced ${post.categoryParent} post with id = ${post.id}`);

  if (R.isNil(posts[index + 1])) {
    return Promise.resolve();
  }

  return sequentialImportPost(index + 1, posts);
};

const importPosts = async () => {
  const response = await fetch(POSTS_ENDPOINT);
  const posts = await response.json();
  await sequentialImportPost(0, posts);

  return R.compose(R.length, R.values)(posts);
};

export default async () => {
  const numberOfPosts = await importPosts();
  return `Synced ${numberOfPosts} posts`;
};
