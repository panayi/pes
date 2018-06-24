import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { Collection } from 'react-virtualized';
import withStyles from '@material-ui/core/styles/withStyles';
import propsChanged from '@pesposa/core/src/utils/propsChanged';
import Card from './Card/Card';
import PaidAdCard from './PaidAdCard/PaidAdCard';
import * as constants from '../constants';
import * as selectors from '../selectors';

const styles = {
  collection: {
    outline: 'none',
    '& > div': {
      // fix shadow cutoff on last card
      marginBottom: 4,
    },
  },
};

class Masonry extends PureComponent {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
    columnWidth: PropTypes.number.isRequired,
    scrollTop: PropTypes.number.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.resetColumnHeights();
  }

  componentDidUpdate(prevProps) {
    if (propsChanged(['hits', 'containerWidth'], prevProps, this.props)) {
      this.resetColumnHeights();
      this.collectionRef.recomputeCellSizesAndPositions();
    }
  }

  getHitSizeAndPosition = ({ index }) => {
    const values = selectors.hitSizeAndPositionSelector({
      ...this.props,
      index,
      columnHeights: this.columnHeights,
    });

    this.columnHeights[values.column] =
      values.y + values.height + constants.GUTTER;
    return values;
  };

  resetColumnHeights = () => {
    const { containerWidth, size } = this.props;
    const columnCount =
      selectors.columnCountSelector({
        containerWidth,
        size,
      }) || 0;
    this.columnHeights = R.times(R.always(0), columnCount);
  };

  registerCollection = ref => {
    const { registerCollection } = this.props;
    this.collectionRef = ref;
    registerCollection(ref);
  };

  renderCell = ({ index, key, style }) => {
    const { hits, columnWidth, fixedCardHeight } = this.props;
    const hit = hits[index];

    return hit.isPaidAd ? (
      <PaidAdCard key={key} style={style} hit={hit} />
    ) : (
      <Card
        key={key}
        style={style}
        hit={hit}
        columnWidth={columnWidth}
        fixedCardHeight={fixedCardHeight}
      />
    );
  };

  render() {
    const {
      containerHeight,
      containerWidth,
      scrollTop,
      hits,
      classes,
    } = this.props;

    return (
      <Collection
        ref={this.registerCollection}
        className={classes.collection}
        cellCount={hits.length}
        cellRenderer={this.renderCell}
        cellSizeAndPositionGetter={this.getHitSizeAndPosition}
        height={containerHeight}
        width={containerWidth}
        scrollTop={scrollTop}
        autoHeight
        verticalOverscanSize={1000}
        tabIndex="-1"
        style={{
          overflowX: 'auto',
          overflowY: 'auto',
        }}
      />
    );
  }
}

export default R.compose(
  withProps(
    createStructuredSelector({
      columnWidth: selectors.columnWidthSelector,
    }),
  ),
  withStyles(styles),
)(Masonry);
