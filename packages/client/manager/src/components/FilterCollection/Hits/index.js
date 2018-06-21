import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { renameProp } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { List, AutoSizer } from 'react-virtualized';
import elementType from 'prop-types-extra/lib/elementType';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import { selectors, actions } from 'store/filterCollection';
import withFilterCollectionId from '../withFilterCollectionId';
import NoHits from '../NoHits/NoHits';

const ROW_HEIGHT = 69;

const getUrlParts = R.compose(R.filter(R.identity), R.split('/'));

export class BaseHits extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-typos
    hitComponent: elementType.isRequired,
    noHitsComponent: elementType,
    hits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    hitProps: PropTypes.shape({}),
    query: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    noHitsComponent: null,
    hitProps: {},
    width: null,
    height: null,
  };

  componentDidMount() {
    this.navigate(this.props);
  }

  componentDidUpdate(prevProps) {
    this.navigate(prevProps);
  }

  componentWillUnmount() {
    const { id, setSelected } = this.props;
    setSelected(id, null);
  }

  navigate = prevProps => {
    const {
      id,
      hits,
      selectedFromProps,
      selected,
      setSelected,
      basePath,
      location,
      history,
    } = this.props;
    const isInCreate = selectedFromProps === 'create';

    if (isInCreate && selected !== null) {
      setSelected(id, null);
    }

    if (
      propsChanged(['selectedFromProps'], prevProps, this.props) &&
      !isInCreate
    ) {
      return setSelected(id, selectedFromProps);
    }

    if (propsChanged(['selected'], prevProps, this.props) && selected) {
      const nextPath = `${basePath}/${selected}`;
      if (!R.equals(getUrlParts(nextPath), getUrlParts(location.pathname))) {
        return history.push(`${basePath}/${selected}`);
      }
    }

    // Check if selected hit does not exists
    // and when it doesn't exist, select an adjacent hit, otherwise go to basePath
    const selectedHit = R.find(R.propEq('id', selected), hits);
    if (!selectedHit && !isInCreate) {
      const prevSelectedIndex = R.findIndex(
        R.propEq('id', prevProps.selected),
        prevProps.hits,
      );
      const nextSelectedIndex =
        (hits[prevSelectedIndex] && prevSelectedIndex) ||
        (hits[prevSelectedIndex - 1] && prevSelectedIndex - 1) ||
        0;
      const nextSelectedHit = hits[nextSelectedIndex];
      const nextSelected = nextSelectedHit ? nextSelectedHit.id : null;
      if (nextSelected !== selected) {
        setSelected(id, nextSelected);
      }
      const nextPath = nextSelected ? `${basePath}/${nextSelected}` : basePath;
      if (!R.equals(getUrlParts(nextPath), getUrlParts(location.pathname))) {
        history.replace(nextPath);
      }
    }

    return null;
  };

  render() {
    const {
      id,
      hitComponent: Hit,
      selected,
      setSelected,
      hits,
      hitProps,
      query,
      width,
      height,
    } = this.props;

    return (
      <List
        width={width}
        height={height}
        overscanRowCount={10}
        rowCount={hits.length}
        rowHeight={ROW_HEIGHT}
        noRowsRenderer={() => (query.length ? <NoHits {...hitProps} /> : null)}
        rowRenderer={({ index, style }) => {
          const hit = hits[index];
          const hitId = hit.id;
          const isSelected = selected === hitId;

          return (
            <div key={hitId} style={style}>
              <Hit
                {...hitProps}
                height={ROW_HEIGHT}
                onClick={() => setSelected(id, hitId)}
                selected={isSelected}
                hit={hit}
              />
            </div>
          );
        }}
      />
    );
  }
}

export const Hits = props => (
  <AutoSizer>
    {({ width, height }) => (
      <BaseHits {...props} width={width} height={height} />
    )}
  </AutoSizer>
);

Hits.propTypes = BaseHits.propTypes;

Hits.defaultProps = BaseHits.defaultProps;

const mapStateToProps = createStructuredSelector({
  hits: selectors.hitsSelector,
  selected: selectors.selectedSelector,
  query: selectors.queryValueSelector,
});

const mapDispatchToProps = {
  setSelected: actions.setSelected,
};

export default R.compose(
  withFilterCollectionId,
  renameProp('selected', 'selectedFromProps'),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Hits);
