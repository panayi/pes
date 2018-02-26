import firebaseApi from 'services/firebase';

export const markAdAsSold = adId => dispatch =>
  dispatch(
    firebaseApi.ads.update(adId, {
      sold: true,
    }),
  );
