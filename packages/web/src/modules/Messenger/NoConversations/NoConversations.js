import React from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import MessageIcon from 'material-ui-icons/Message';
import { modals } from 'store/modals';
import Link from 'components/Link/Link';
import EmptyHero from 'components/EmptyHero/EmptyHero';

const styles = theme => ({
  actions: {
    display: 'flex',
    marginTop: theme.spacing.unit * 4,
  },
  browseLink: {
    marginLeft: theme.spacing.unit * 2,
  },
});

const ShowCreateAdButton = modals.createAd.showButton;

const NoConversations = ({ classes }) => (
  <EmptyHero icon={MessageIcon} tagline="You have no messages">
    <div className={classes.actions}>
      <ShowCreateAdButton variant="raised" color="primary">
        Sell Your Stuff
      </ShowCreateAdButton>
      <Link className={classes.browseLink} to="/" component={Button}>
        <Typography variant="button">Browse</Typography>
      </Link>
    </div>
  </EmptyHero>
);

export default withStyles(styles)(NoConversations);
