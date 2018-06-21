import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { withProps, withState } from 'recompose';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ArchiveIcon from '@material-ui/icons/Archive';
import EmailIcon from '@material-ui/icons/Email';
import MessageIcon from '@material-ui/icons/Message';
import propSelector from '@pesposa/core/src/utils/propSelector';
import Card from '@pesposa/client-core/src/modules/ListAds/Masonry/Card/Card';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import Button from '@pesposa/client-core/src/components/Button/Button';
import Link from '@pesposa/client-core/src/components/Link/Link';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import { actions } from 'store/convertExternalUserTasks';
import withSellerAds from 'hocs/withSellerAds/withSellerAds';
import Panel from 'components/Panel/Panel';
import Engagements from './Engagements/Engagements';
import MessageExternalUser from './MessageExternalUser/MessageExternalUser';
import EmailExternalUser from './EmailExternalUser/EmailExternalUser';

const MESSAGE_EXTERNAL_USER_MODAL_ID = 'messageExternalUser';
const EMAIL_EXTERNAL_USER_MODAL_ID = 'emailExternalUser';

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
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  ads: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'auto',
    padding: theme.spacing.unit * 2,
    background: theme.palette.common.white,
  },
  ad: {
    width: 200,
    margin: [
      theme.spacing.unit,
      theme.spacing.unit,
      theme.spacing.unit * 4,
      theme.spacing.unit,
    ],
  },
  selectedAd: {
    border: [1, 'solid', theme.palette.primary.main],
    borderRadius: theme.borderRadius.md,
  },
  selectAdButton: {
    marginTop: theme.spacing.unit,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 64,
    padding: theme.spacing.unit * 2,
    borderTop: [1, 'solid', theme.palette.divider],
    borderBottom: [1, 'solid', theme.palette.divider],
    background: theme.palette.background.default,
  },
  engagements: {
    height: 300,
    maxHeight: '40%',
    background: theme.palette.common.white,
  },
  icon: {
    marginRight: theme.spacing.unit / 2,
  },
});

class ConvertExternalUserTask extends React.Component {
  handleSendEmailClick = () => {
    const { externalUserId, selectedAdId, sendEmail } = this.props;
    sendEmail(externalUserId, selectedAdId);
  };

  handleArchiveClick = () => {
    const { externalUserId, archive } = this.props;
    archive(externalUserId);
  };

  renderAd = ad => {
    const { selectedAdId, setSelectedAdId, classes } = this.props;
    const isSelected = ad.id === selectedAdId;

    return (
      <div key={ad.id} className={classes.ad}>
        <Card
          className={classNames({ [classes.selectedAd]: isSelected })}
          hit={ad}
          fixedCardHeight={250}
          linkProps={{
            target: '_blank',
          }}
        />
        <Button
          className={classes.selectAdButton}
          variant="outlined"
          size="small"
          disabled={isSelected}
          onClick={() => setSelectedAdId(ad.id)}
          fullWidth
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </div>
    );
  };

  render() {
    const {
      externalUserId,
      task,
      ads,
      openModal,
      code,
      selectedAdId,
      classes,
    } = this.props;
    const name = R.path(
      ['task', 'externalUser', 'profile', 'name'],
      this.props,
    );
    const email = R.path(['task', 'externalUser', 'email'], this.props);
    const engagements = R.prop('engagements', task);

    return (
      <Panel
        classes={{
          root: classes.root,
          header: classes.header,
          content: classes.content,
        }}
        header={
          <React.Fragment>
            <Link to={`/data/external-users/${externalUserId}`}>
              <Typography variant="title">{name}</Typography>
            </Link>
            <Button onClick={this.handleArchiveClick}>
              <ArchiveIcon className={classes.icon} />
              Archive
            </Button>
          </React.Fragment>
        }
      >
        <div className={classes.ads}>{R.map(this.renderAd, ads)}</div>
        <div className={classes.actions}>
          <Button
            disabled={isNilOrEmpty(selectedAdId)}
            onClick={() =>
              openModal(MESSAGE_EXTERNAL_USER_MODAL_ID, {
                externalUserId,
                adId: selectedAdId,
                code,
              })
            }
          >
            <MessageIcon className={classes.icon} />
            Message
          </Button>
          <Button
            disabled={isNilOrEmpty(selectedAdId) || isNilOrEmpty(email)}
            onClick={() =>
              openModal(EMAIL_EXTERNAL_USER_MODAL_ID, {
                externalUserId,
                adId: selectedAdId,
                name,
                email,
                engagements,
              })
            }
          >
            <EmailIcon className={classes.icon} />
            Email
          </Button>
        </div>
        <div className={classes.engagements}>
          <Engagements engagements={R.prop('engagements', task)} />
        </div>
        <ReduxModal
          id={MESSAGE_EXTERNAL_USER_MODAL_ID}
          content={MessageExternalUser}
        />
        <ReduxModal
          id={EMAIL_EXTERNAL_USER_MODAL_ID}
          content={EmailExternalUser}
        />
      </Panel>
    );
  }
}

ConvertExternalUserTask.defaultProps = {
  task: {},
};

const mapDataToProps = {
  task: models.convertExternalUserTasks.one(propSelector('externalUserId')),
  code: models.externalUsers.one(propSelector('externalUserId')).child('code'),
};

const mapDispatchToProps = {
  archive: actions.archive,
  openModal: modalActions.openModal,
};

export default R.compose(
  withProps(
    createStructuredSelector({
      externalUserId: propSelector(['match', 'params', 'externalUserId']),
    }),
  ),
  connectData(mapDataToProps, null, mapDispatchToProps),
  withSellerAds(propSelector('externalUserId')),
  withState('selectedAdId', 'setSelectedAdId', null),
  withRouter,
  withStyles(styles),
)(ConvertExternalUserTask);
