import React, { Component } from 'react';
import ListAds from 'components/ListAds/ListAds';
import Search from 'modules/Search/Search';

export default class ListUserAds extends Component {
  render() {
    const { userId, currentTab } = this.props;
    const sold = currentTab === 0 ? false : true; // eslint-disable-line no-unneeded-ternary

    return (
      <Search params={{ facetFilters: [`user:${userId}`, `sold:${sold}`] }}>
        {props => <ListAds {...props} sidebarWidth={0} />}
      </Search>
    );
  }
}
