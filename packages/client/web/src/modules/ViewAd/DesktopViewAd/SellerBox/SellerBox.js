import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import SellerImage from '@pesposa/client-core/src/modules/Ad/SellerImage/SellerImage';
import SellerName from '@pesposa/client-core/src/modules/Ad/SellerName/SellerName';
import LinkToSeller from '@pesposa/client-core/src/modules/Ad/LinkToSeller/LinkToSeller';
import RevealPhoneButton from '../../RevealPhoneButton/RevealPhoneButton';
import VerifiedWith from '../../VerifiedWith/VerifiedWith';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.white,
  },
  avatarWrap: {
    border: [4, 'solid', theme.palette.common.white],
    borderRadius: '50%',
    padding: 0,
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  avatar: {
    width: '56px !important',
    height: '56px !important',
    [theme.breakpoints.down(theme.map.tablet)]: {
      width: '48px !important',
      height: '48px !important',
    },
  },
  details: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    boxSizing: 'border-box',
    marginLeft: theme.spacing.unit * 2,
    padding: [theme.spacing.unit, 0],
    textShadow: '0 1px 3px rgba(0,0,0,.8)',
    [theme.breakpoints.down(theme.map.tablet)]: {
      marginLeft: theme.spacing.unit,
    },
  },
  name: {
    marginBottom: theme.spacing.unit / 2,
    letterSpacing: 0.6,
    fontSize: '18px',
    fontWeight: 700,
  },
});

const SellerBox = ({ ad, className, classes }) => (
  <div className={classNames(classes.root, className)}>
    <LinkToSeller
      sellerId={ad.seller}
      sellerType={ad.sellerType}
      className={classes.avatarWrap}
    >
      <SellerImage ad={ad} className={classes.avatar} />
    </LinkToSeller>
    <div className={classes.details}>
      <SellerName ad={ad}>
        {({ name }) => (
          <Typography
            className={classes.name}
            variant="subheading"
            color="inherit"
          >
            {name}
          </Typography>
        )}
      </SellerName>
      {ad.sellerType === sellerTypes.USER && <VerifiedWith user={ad.seller} />}
    </div>
    <RevealPhoneButton
      ad={ad}
      buttonProps={{
        variant: 'raised',
      }}
    >
      Call seller
    </RevealPhoneButton>
  </div>
);

export default withStyles(styles)(SellerBox);
