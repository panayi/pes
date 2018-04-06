import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { compose, mapProps, toClass } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Panel from '../Panel/Panel';
import ScrollableListItem from './ScrollableListItem';
import WithPlaceholders from './WithPlaceholders';

const WIDTH = 290;
const PLACEHOLDERS_COUNT = 30;

const styles = theme => ({
  root: {
    width: WIDTH,
    flex: [0, 0, `${WIDTH}px`],
    height: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  fullWidth: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
  },
});

export const ScrollableList = ({
  panelProps,
  fullWidth,
  isLoading,
  children,
  classes,
}) => (
  <div
    className={classNames(classes.root, {
      [classes.fullWidth]: fullWidth,
    })}
  >
    <Panel
      classes={R.merge(panelProps.classes, { header: classes.header })}
      {...panelProps}
    >
      <WithPlaceholders when={isLoading} howMany={PLACEHOLDERS_COUNT}>
        {children}
      </WithPlaceholders>
    </Panel>
  </div>
);

ScrollableList.propTypes = {
  panelProps: PropTypes.shape({}),
  fullWidth: PropTypes.bool,
  classes: PropTypes.shape({}).isRequired,
};

ScrollableList.defaultProps = {
  panelProps: {},
  fullWidth: false,
};

const ConnectedScrollableList = compose(
  mapProps(({ fullWidth, isLoading, children, ...rest }) => ({
    fullWidth,
    isLoading,
    children,
    panelProps: rest,
  })),
  withStyles(styles),
  toClass,
)(ScrollableList);

ConnectedScrollableList.item = ScrollableListItem;

export default ConnectedScrollableList;
