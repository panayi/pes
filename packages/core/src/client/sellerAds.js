import * as modelPaths from '../config/modelPaths';

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const getAllPublished = async (firebase, sellerId) =>
  firebase.ref(modelPaths.SELLER_ADS(sellerId).string).once('value');
