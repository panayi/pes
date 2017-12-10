/* @flow */

declare type Category = {
  name: string,
  categories: Array<Category>,
};

declare type Ad = {
  address: string,
  body: string,
  category: string,
  categoryChild: string,
  email: string,
  images: Array<string>,
  oldId: string,
  permalink: string,
  phone: string,
  user: string,
  title: string,
  price: number,
  createdAt: number,
};
