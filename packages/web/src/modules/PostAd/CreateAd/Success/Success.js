import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import DoneIcon from 'material-ui-icons/CheckCircle';
import { selectors as authSelectors } from 'store/firebase/auth';
import EmptyHero from 'components/EmptyHero/EmptyHero';
import A from 'components/A/A';
import Button from 'components/Button/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    [theme.breakpoints.up(theme.map.laptop)]: {
      minWidth: 450,
    },
  },
  success: {
    marginBottom: theme.spacing.unit * 3,
  },
  link: {
    display: 'inline',
  },
  profileLink: {
    textAlign: 'center',
  },
});

const CreateAdSuccess = ({
  onPostAnotherClick,
  currentUserId,
  DialogContent,
  DialogActions,
  classes,
  closeModal,
}) => (
  <React.Fragment>
    <DialogContent>
      <div className={classes.root}>
        <div className={classes.success}>
          <EmptyHero
            icon={DoneIcon}
            tagline="Your ad has been created!"
            small
          />
          <Typography className={classes.profileLink}>
            Check the status of your ad on{' '}
            <A
              className={classes.link}
              component={NavLink}
              to={`/user/${currentUserId}/pending`}
              onClick={() => closeModal()}
            >
              your profile
            </A>.
          </Typography>
        </div>
        <Button onClick={onPostAnotherClick} variant="raised" color="primary">
          Post another ad
        </Button>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => closeModal()}>Close</Button>
    </DialogActions>
  </React.Fragment>
);

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
});

export default R.compose(connect(mapStateToProps), withStyles(styles))(
  CreateAdSuccess,
);
