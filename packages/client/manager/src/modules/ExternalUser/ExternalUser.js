import React from 'react';
import * as R from 'ramda';
import { withProps, branch } from 'recompose';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import Button from '@pesposa/client-core/src/components/Button/Button';
import { actions as externalUserActions } from 'store/externalUsers';
import Panel from 'components/Panel/Panel';
import CreateExternalUser from './CreateExternalUser/CreateExternalUser';
import EditExternalUser from './EditExternalUser/EditExternalUser';

const styles = theme => ({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    paddingRight: theme.spacing.unit / 2,
  },
});

const ExternalUser = ({
  externalUserId,
  externalUser,
  removeExternalUser,
  classes,
}) => {
  const name = R.path(['profile', 'name'], externalUser);

  return (
    <Panel
      classes={{
        root: classes.root,
        header: classes.header,
      }}
      header={
        <React.Fragment>
          <Typography variant="title">
            {externalUserId ? name : 'New ExternalUser'}
          </Typography>
          {externalUserId ? (
            <Button
              onClick={() => removeExternalUser(externalUserId)}
              size="small"
            >
              <DeleteIcon />
            </Button>
          ) : null}
        </React.Fragment>
      }
    >
      {externalUserId ? (
        <EditExternalUser
          externalUserId={externalUserId}
          externalUser={externalUser}
        />
      ) : (
        <CreateExternalUser />
      )}
    </Panel>
  );
};

const mapDataToProps = {
  externalUser: models.externalUsers.one(propSelector(['externalUserId'])),
};

const mapDispatchToProps = {
  removeExternalUser: externalUserActions.remove,
};

export default R.compose(
  withProps(props => ({
    externalUserId: R.path(['match', 'params', 'externalUserId'], props),
  })),
  branch(
    propSelector('externalUserId'),
    connectData(mapDataToProps, null, mapDispatchToProps),
    connect(
      null,
      mapDispatchToProps,
    ),
  ),
  withStyles(styles),
)(ExternalUser);
