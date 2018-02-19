import api from 'services/api';

export const markAdAsSold = (adId) => (dispatch) => (
  dispatch(api.ads.update(adId, {
    sold: true
  }))
);