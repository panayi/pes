/* @flow */

declare type Category = {
  name: string,
  categories: Array<Category>,
};

declare type Image = {
  downloadURL: string,
  fullPath: string,
  name: string,
  createdAt: number,
};

declare type Ad = {
  address: string,
  body: string,
  category: string,
  categoryChild: string,
  email: string,
  images: Map<Image>,
  oldId: string,
  permalink: string,
  phone: string,
  user: string,
  title: string,
  price: number,
  createdAt: number,
};