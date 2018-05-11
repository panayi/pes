import React from 'react';
import ListAds from 'components/ListAds/ListAds';
import Search from 'modules/Search/Search';
import FetchAdsProgress from 'modules/Search/FetchAdsProgress/FetchAdsProgress';
import NoResults from './NoResults/NoResults';

const ListUserAds = ({ sold, userId, isCurrentUser }) => {
  const params = {
    user: userId,
    sold,
    ids: null,
    category: ' ', // TODO: hacky way to include all categories
  };

  return (
    <Search params={params}>
      {props => (
        <React.Fragment>
          <ListAds {...props} sidebarWidth={0} />
          <FetchAdsProgress
            noResults={
              <NoResults
                sold={sold}
                userId={userId}
                isCurrentUser={isCurrentUser}
              />
            }
          />
        </React.Fragment>
      )}
    </Search>
  );
};

export default ListUserAds;
