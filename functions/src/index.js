import * as functions from 'firebase-functions';
import app from './app';
import algoliaPost from './algolia/post';

exports.app = functions.https.onRequest(app);
exports.algoliaPost = algoliaPost;
