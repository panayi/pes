import React from 'react';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import Link from 'components/Link/Link';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import UserFullName from 'components/UserFullName/UserFullName';
import RevealPhoneButton from '../../RevealPhoneButton/RevealPhoneButton';
import VerifiedWith from '../../VerifiedWith/VerifiedWith';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.white,
  },
  avatarWrap: {
    padding: 0,
    minWidth: 'auto',
  },
  avatar: {
    border: [4, 'solid', theme.palette.common.white],
    width: '64px !important',
    height: '64px !important',
    '& > svg': {
      width: 52,
      height: 52,
    },
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
    <Link
      className={classes.avatarWrap}
      to={ad.user ? `/user/${ad.user}` : null}
    >
      <ProfileImage className={classes.avatar} userId={ad.user} />
    </Link>
    <div className={classes.details}>
      {ad.user && (
        <React.Fragment>
          <UserFullName
            userId={ad.user}
            render={({ userFullName }) => (
              <Typography
                className={classes.name}
                variant="subheading"
                color="inherit"
              >
                {userFullName}
              </Typography>
            )}
          />
          <VerifiedWith user={ad.user} />
        </React.Fragment>
      )}
    </div>
    <RevealPhoneButton
      ad={ad}
      buttonProps={{
        variant: 'raised',
        color: ad.user ? 'default' : 'primary',
      }}
    >
      Call seller
    </RevealPhoneButton>
  </div>
);

export default withStyles(styles)(SellerBox);
