import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import propSelector from '@pesposa/core/src/utils/propSelector';
import Link from '../../../components/Link/Link';

const LinkToSeller = ({
  sellerId,
  sellerType,
  children,
  sellerProfilePath,
  history,
  ...rest
}) => {
  const renderProps = isFunction(children);

  return renderProps ? (
    children({
      navigate: () => history.push(sellerProfilePath),
    })
  ) : (
    <Link to={sellerProfilePath} {...rest}>
      {children}
    </Link>
  );
};

LinkToSeller.propTypes = {
  sellerId: PropTypes.string,
  sellerType: PropTypes.oneOf(R.values(sellerTypes)),
};

LinkToSeller.defaultProps = {
  sellerId: null,
  sellerType: null,
};

const sellerProfilePathSelector = createSelector(
  propSelector(['sellerId']),
  propSelector(['sellerType']),
  (sellerId, sellerType) =>
    sellerId && sellerType
      ? `/user${
          sellerType === sellerTypes.EXTERNAL_USER ? '/e' : ''
        }/${sellerId}`
      : null,
);

export default R.compose(
  withProps(
    createStructuredSelector({
      sellerProfilePath: sellerProfilePathSelector,
    }),
  ),
  withRouter,
)(LinkToSeller);
