import PropTypes from 'prop-types';

const Action = props => {
  const { noUser, buyer, seller, sold, ad, currentUserId } = props;

  if (ad.user && ad.user === currentUserId) {
    return seller;
  }

  if (ad.sold) {
    return sold;
  }

  if (ad.user && ad.user !== currentUserId) {
    return buyer;
  }

  return noUser;
};

Action.propTypes = {
  ad: PropTypes.shape().isRequired,
  currentUserId: PropTypes.string,
  seller: PropTypes.node,
  buyer: PropTypes.node,
  noUser: PropTypes.node,
  sold: PropTypes.node,
};

Action.defaultProps = {
  currentUserId: null,
  seller: null,
  buyer: null,
  noUser: null,
  sold: null,
};

export default Action;
