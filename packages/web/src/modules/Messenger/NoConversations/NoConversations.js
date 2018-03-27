import React from 'react';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import MessageIcon from 'material-ui-icons/Message';
import Link from 'components/Link/Link';
import EmptyHero from 'components/EmptyHero/EmptyHero';
import ShowCreateAdButton from 'components/ShowCreateAdButton/ShowCreateAdButton';

const styles = theme => ({
  actions: {
    display: 'flex',
    marginTop: theme.spacing.unit * 4,
  },
  browseLink: {
    marginLeft: theme.spacing.unit * 2,
  },
});

const NoConversations = ({ classes }) => (
  <EmptyHero icon={MessageIcon} tagline="You have no messages">
    <div className={classes.actions}>
      <ShowCreateAdButton />
      <Link className={classes.browseLink} to="/">
        <Typography variant="button">Browse</Typography>
      </Link>
    </div>
  </EmptyHero>
);

export default withStyles(styles)(NoConversations);
