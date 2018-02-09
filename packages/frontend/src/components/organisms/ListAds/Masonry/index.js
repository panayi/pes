import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { Collection } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import { propsChanged } from 'pesposa-utils';
import Card from '../Card';
import * as constants from '../constants';
import * as selectors from '../selectors';

// type Props = {
//   hits: Array<any>,
//   itemComponent: Class<React$Component<*, *>>,
//   width: number,
//   getItemKey: Function,
//   classes: Object,
//   theme: Object,
// };

const styles = {
  collection: {
    '& > div': {
      // fix shadow cutoff on last card
      paddingBottom: 4,
    },
  },
};

class Masonry extends PureComponent<Props> {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
    columnWidth: PropTypes.number.isRequired,
    scrollTop: PropTypes.number.isRequired,
    classes: PropTypes.shape().isRequired,
  };

  componentWillMount() {
    this.resetColumnHeights();
  }

  componentWillReceiveProps(nextProps) {
    if (propsChanged(['hits', 'containerWidth'], this.props, nextProps)) {
      this.resetColumnHeights();
      this.collectionRef.recomputeCellSizesAndPositions();
    }
  }

  getHitSizeAndPosition = ({ index }) => {
    const { hits, containerWidth } = this.props;
    const values = selectors.hitSizeAndPositionSelector({
      index,
      hits,
      containerWidth,
      columnHeights: this.columnHeights,
    });

    this.columnHeights[values.column] =
      values.y + values.height + constants.GUTTER;
    return values;
  };

  resetColumnHeights = () => {
    const columnCount =
      selectors.columnCountSelector({
        containerWidth: this.props.containerWidth,
      }) || 0;
    this.columnHeights = R.times(R.always(0), columnCount);
  };

  registerCollection = ref => {
    this.collectionRef = ref;
    this.props.registerCollection(ref);
  };

  renderCell = ({ index, key, style }) => {
    const { hits, columnWidth } = this.props;
    const hit = hits[index];

    return <Card key={key} style={style} hit={hit} columnWidth={columnWidth} />;
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
        tabIndex={-1}
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
