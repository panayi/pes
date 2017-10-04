/* @flow */

declare type Category = {
  name: string,
  categories: Array<Category>,
};

declare type Post = {
  address: string,
  body: string,
  category: string,
  categoryChild: string,
  email: string,
  images: Array<string>,
  oldId: string,
  permalink: string,
  phone: string,
  posterId: string,
  title: string,
  price: number,
};
