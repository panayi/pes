import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import MessageIcon from 'material-ui-icons/Message';
import { actions as modalActions } from 'store/modals';
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

const NoConversations = ({ openModal, classes }) => (
  <EmptyHero icon={MessageIcon} tagline="You have no messages">
    <div className={classes.actions}>
      <Button
        variant="raised"
        color="primary"
        onClick={() => openModal('createAd')}
      >
        Sell Your Stuff
      </Button>
      <Link className={classes.browseLink} to="/" component={Button}>
        <Typography variant="button">Browse</Typography>
      </Link>
    </div>
  </EmptyHero>
);

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(connect(null, mapDispatchToProps), withStyles(styles))(
  NoConversations,
);
