/* @flow */

declare type AlgoliaId = 'objectID';

declare type AlgoliaAd = {
  [AlgoliaId]: ID,
  title: AdTitle,
  body: AdBody,
  category: ID,
  price: number,
  user: ID,
  images: Array<Image>,
  createdAt: PastEpoch,
  location: Location,
  _geoloc: {
    lat: number,
    lng: number
  }
}
