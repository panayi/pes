/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import ReactMasonry from 'react-masonry-infinite';
import { withStyles } from 'material-ui/styles';
import { propsChanged } from 'pesposa-utils';
import renderNothingWhen from 'components/hocs/renderNothingWhen';

type Props = {
  items: Array<any>,
  itemComponent: Class<React$Component<*, *>>,
  width: number,
  getItemKey: Function,
  classes: Object,
  theme: Object,
};

const styles = theme => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    margin: [3 * theme.spacing.unit, 0, theme.spacing.unit, 0],
  },
});

class Masonry extends Component<Props> {
  static defaultProps = {
    items: [],
  };

  shouldComponentUpdate(nextProps) {
    if (
      propsChanged(
        ['sizes', 'hasMore', 'isLoading', 'width'],
        this.props,
        nextProps,
      )
    ) {
      return true;
    }

    const { items, getItemKey } = this.props;
    const { items: nextItems } = nextProps;
    const itemKeys = R.map(getItemKey, items);
    const nextItemKeys = R.map(getItemKey, nextItems);

    if (!R.equals(itemKeys, nextItemKeys)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: Props) {
    // If the search hits have changed,
    // force Masonry to recalulate layout
    if (this.masonry) {
      const { items, getItemKey } = this.props;
      const { items: nextItems } = prevProps;
      const itemKeys = R.map(getItemKey, items);
      const nextItemKeys = R.map(getItemKey, nextItems);

      if (!R.equals(itemKeys, nextItemKeys)) {
        this.masonry.forcePack();
      }
    }
  }

  masonry: ?Object;

  render() {
    const {
      items,
      itemComponent: Item,
      width,
      getItemKey,
      classes,
      theme,
      ...rest
    } = this.props;

    return (
      <ReactMasonry
        ref={instance => {
          this.masonry = instance;
        }}
        {...rest}
      >
        {R.map(
          item => <Item key={getItemKey(item)} item={item} width={width} />,
          items,
        )}
      </ReactMasonry>
    );
  }
}

export default R.compose(
  renderNothingWhen(R.propSatisfies(isNilOrEmpty, 'items')),
  withStyles(styles, { withTheme: true }),
)(Masonry);
