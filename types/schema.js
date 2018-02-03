/* @flow */
declare type ID = string

declare type PositiveNumber = string

declare type Price = number

declare type URL = string

declare type PastEpoch = string

declare type AdTitle = string

declare type AdBody = string

declare type PhoneNumber = string

declare type Email = string

declare type IP = string

declare type Geoposition = {|
  latitude: number,
  longitude: number,
|}

declare type Address = {|
  street: ?string,
  city: ?string,
  postalCode: ?string,
  country: string,
|}

declare type Location = {|
  geoposition: Geoposition,
  address: Address,
  from: String
|}

declare type Locale = {|
  id: ID,
  language: string,
  region: string,
|}

declare type Country = {|
  code: string,
  name: string,
  geoposition: Geoposition,
  default: ?boolean,
|}

declare type SubCategory = {|
  name: String,
|}

declare type Category = {|
  name: string,
  categories: {
    [id: ID]: SubCategory
  },
|}

declare type Dimension = {|
  width: number,
  height: number,
|}

declare type Image = {|
  downloadURL: URL,
  fullPath: string,
  name: string,
  createdAt: PastEpoch,
  dimensions: ?Dimension,
|}

declare type Ad = {|
  title: AdTitle,
  body: AdBody,
  price: Price,
  location: Location,
  category: ID,
  user: ID,
  createdAt: PastEpoch,
|}

declare type PendingReviewAd = {|
  title: AdTitle,
  body: AdBody,
  price: Price,
  category: ID,
  user: String,
  images: {
    [id: ID]: Image
  },
|}

declare type DraftAd = {|
  title: ?AdTitle,
  body: ?AdBody,
  price: ?Price,
  category: ?ID,
  images: ?{
    [id: ID]: Image
  },
|}

type Provider = {|
  displayName: ?string,
  email: ?Email,
  phoneNumber: ?PhoneNumber,
  photoURL: ?URL,
  providerId: string,
  uid: ID,
|}

declare type ProfileImage = {|
  downloadURL: URL,
  providerId: string,
  fullPath: ?string,
|}

declare type Profile = {|
  displayName: ?string,
  image: ?ProfileImage,
  providerIds: ?{
    [string]: true
  }
|}

declare type User = {|
  email: ?Email,
  providerData: ?{
    [string]: Provider
  },
  locale: ?string,
  location: ?Location,
  ip: ?IP,
  profile: ?Profile,
|}

declare type Conversation = {|
  ad: ID,
  buyer: ID,
  read?: boolean,
  lastMessageCreatedAt: PastEpoch,
|}

declare type Message = {|
  body: string,
  fromBuyer: boolean,
  read: ?boolean,
  createdAt: ?PastEpoch
|}

declare type CategoriesRoot = 'categories';