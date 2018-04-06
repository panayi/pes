import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ErrorIcon from '@material-ui/icons/Error';
import { selectors as siteSelectors } from '@pesposa/client-core/src/store/site';
import Button from '@pesposa/client-core/src/components/Button/Button';

const styles = theme => ({
  root: {
    width: 450,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: theme.typography.display2.fontSize,
    color: theme.palette.error.main,
  },
});

const CreateAdFailure = ({
  siteCountryName,
  siteDomain,
  DialogContent,
  DialogActions,
  classes,
  closeModal,
}) => (
  <React.Fragment>
    <DialogContent>
      <div className={classes.root}>
        <ErrorIcon className={classes.icon} />
        <Typography variant="subheading" color="inherit">
          You need to be located in {siteCountryName} to sell on {siteDomain}
        </Typography>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => closeModal()}>Close</Button>
    </DialogActions>
  </React.Fragment>
);

const mapStateToProps = createStructuredSelector({
  siteCountryName: siteSelectors.countryNameSelector,
  siteDomain: siteSelectors.countryDomainSelector,
});

export default R.compose(connect(mapStateToProps), withStyles(styles))(
  CreateAdFailure,
);
