import React from 'react';
import { withStyles } from 'material-ui/styles';
import Link from 'components/Link/Link';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import UserFullName from 'components/UserFullName/UserFullName';
import RevealPhoneButton from '../RevealPhoneButton/RevealPhoneButton';
import VerifiedWith from '../VerifiedWith/VerifiedWith';

const SIZE = 64;

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.white,
    textShadow: '0 1px 3px rgba(0,0,0,.8)',
  },
  avatarWrap: {
    padding: 0,
    minWidth: 'auto',
  },
  avatar: {
    border: [4, 'solid', theme.palette.common.white],
    '& > svg': {
      width: 52,
      height: 52,
    },
  },
  details: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: SIZE,
    boxSizing: 'border-box',
    marginLeft: theme.spacing.unit * 2,
    padding: [theme.spacing.unit, 0],
  },
  name: {
    marginBottom: theme.spacing.unit / 2,
    letterSpacing: 0.6,
    fontSize: '18px',
    fontWeight: 700,
  },
});

const SellerBox = ({ ad, classes }) => (
  <div className={classes.root}>
    <Link className={classes.avatarWrap} to={`/user/${ad.user}`}>
      <ProfileImage className={classes.avatar} size={SIZE} userId={ad.user} />
    </Link>
    <div className={classes.details}>
      {ad.user && (
        <React.Fragment>
          <UserFullName
            userId={ad.user}
            className={classes.name}
            color="inherit"
            variant="subheading"
          />
          <VerifiedWith user={ad.user} />
        </React.Fragment>
      )}
    </div>
    {/* Only for legacy ads */}
    {!ad.user && (
      <RevealPhoneButton ad={ad}>Contact seller</RevealPhoneButton>
    )}
  </div>
);

export default withStyles(styles)(SellerBox);
