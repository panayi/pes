import admin from 'firebase-admin';
import app from './controllers/app';

admin.database.enableLogging(true);

export { app };
export * from './controllers/adImages';
export * from './controllers/ads';
export * from './controllers/messages';
export * from './controllers/pendingReviewAds';
export * from './controllers/users';
