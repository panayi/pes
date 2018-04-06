import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { Switch, Route } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import renderNothingWhen from '@pesposa/client-core/src/hocs/renderNothingWhen';
import Search from '@pesposa/client-core/src/modules/Search/Search';
import AdsList from '../../../AdsList/AdsList';
import Ad from '../../../Ad/Ad';

const HITS_PER_PAGE = 40;

const getFirebasePath = ad => `/${modelPaths.ADS.string}/${ad.id}`;

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 2,
  },
});

class ListSimilarAds extends React.Component {
  static defaultProps = {
    hitsPerPage: 10,
    maxHits: 30,
  };

  renderContent = searchProps => {
    const { basePath } = this.props;
    const { hits } = searchProps;

    return (
      <Switch>
        <Route
          exact
          path={basePath}
          render={() => (
            <AdsList
              id="similarAds"
              ads={hits}
              basePath={basePath}
              getFirebasePath={getFirebasePath}
              isLoaded
            />
          )}
        />
        <Route
          path={`${basePath}/:otherAdId`}
          render={routeProps => {
            const adId = routeProps.match.params.otherAdId;
            const ad = R.find(R.propEq('id', adId), hits);

            return (
              <React.Fragment>
                <AdsList
                  id="similarAds"
                  ads={hits}
                  basePath={basePath}
                  selected={adId}
                  getFirebasePath={getFirebasePath}
                  isLoaded
                />
                <Ad adId={adId} ad={ad} />
              </React.Fragment>
            );
          }}
        />
      </Switch>
    );
  };

  render() {
    const { ad, adId } = this.props;

    return (
      <Search
        params={{
          sortBy: 'default',
          category: ' ',
          rawProps: {
            query: ad.props.title,
            removeWordsIfNoResults: 'allOptional',
            hitsPerPage: HITS_PER_PAGE,
            filters: `NOT objectID:${adId}`,
          },
        }}
      >
        {this.renderContent}
      </Search>
    );
  }
}

export default R.compose(
  renderNothingWhen(R.pathSatisfies(isNilOrEmpty, ['ad', 'props', 'title'])),
  withStyles(styles),
)(ListSimilarAds);
