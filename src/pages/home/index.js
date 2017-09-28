/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { Route } from 'react-router-dom';
import { withProps } from 'recompose';
import Page from '../../lib/components/Page';
import SideNav, { type LinkType } from '../../lib/components/SideNav';
import withCategories from '../../categories/withCategoriesHoc';
import Posts from './posts';

type Props = {
  categories: Array<Category>,
  categoryLinks: Array<LinkType>,
};

const SIDEBAR_WIDTH = 200;

const PostsWithProps = withProps({ sidebarWidth: SIDEBAR_WIDTH })(Posts);

export class Home extends Component<Props> {
  static defaultProps = {
    categories: [],
  };

  render() {
    const { categoryLinks } = this.props;

    return (
      <Page>
        <SideNav
          header="Categories"
          links={categoryLinks || []}
          width={SIDEBAR_WIDTH}
        />
        <Route
          path="/:categoryName?"
          component={PostsWithProps}
        />
      </Page>
    );
  }
}

export default R.compose(
  withCategories,
  withProps(({ categories }) => ({
    categoryLinks: R.map(
      ({ name }) => ({
        label: name,
        to: `/${name}`,
      }),
      categories,
    ),
  })),
)(Home);
