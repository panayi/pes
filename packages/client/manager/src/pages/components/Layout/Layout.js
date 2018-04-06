import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import * as taskTypes from '@pesposa/core/src/config/taskTypes';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import BaseLayout from '@pesposa/client-core/src/layouts/Layout/Layout';
import { selectors as drawerSelectors } from 'store/drawer';
import CreateSubmissionTask from 'modules/SubmissionTask/CreateSubmissionTask/CreateSubmissionTask';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import ToggleDrawer from './ToggleDrawer/ToggleDrawer';

const CREATE_SUBMISSION_MODAL_ID = 'createSubmission';
const DRAWER_WIDTH = 250;
const TOOLBAR_HEIGHT = 48;

const styles = theme => ({
  '@global': {
    html: {
      background: '#fafafa',
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
  },
  appBar: {
    background: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
  toolbar: {
    borderBottom: 'none',
  },
  drawer: {
    position: 'relative',
    height: '100%',
    width: DRAWER_WIDTH,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  content: {
    display: 'flex',
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      content: {
        height: `calc(100% - ${TOOLBAR_HEIGHT}px)`,
        marginTop: TOOLBAR_HEIGHT,
      },
    },
  },
  contentLeft: {
    marginLeft: -DRAWER_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentShiftLeft: {
    marginLeft: 0,
  },
  createSubmissionModal: {
    maxWidth: 'none',
  },
  badge: {
    top: 0,
    right: -6,
  },
});

const Layout = props => {
  const {
    title,
    children,
    isDrawerOpened,
    noSidebar,
    tasksCount,
    openModal,
    classes,
  } = props;

  return (
    <BaseLayout
      headerClasses={{ appBar: classes.appBar, toolbar: classes.toolbar }}
      header={
        <Header
          title={title}
          actions={
            tasksCount.total > 0 ? (
              <Badge
                classes={{ badge: classes.badge }}
                badgeContent={tasksCount.total}
                color="primary"
              >
                <ToggleDrawer />
              </Badge>
            ) : (
              <ToggleDrawer />
            )
          }
          secondaryActions={
            <IconButton
              color="inherit"
              onClick={() => openModal(CREATE_SUBMISSION_MODAL_ID)}
            >
              <AddIcon />
            </IconButton>
          }
        />
      }
    >
      <div className={classes.root}>
        <Drawer
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
          className={classes.drawer}
          anchor="left"
          open={isDrawerOpened}
        >
          {!noSidebar && <Sidebar tasksCount={tasksCount} />}
        </Drawer>
        <main
          className={classNames(classes.content, classes.contentLeft, {
            [classes.contentShift]: isDrawerOpened,
            [classes.contentShiftLeft]: isDrawerOpened,
          })}
        >
          {children}
        </main>
      </div>
      <ReduxModal
        id={CREATE_SUBMISSION_MODAL_ID}
        maxWidth="md"
        content={CreateSubmissionTask}
      />
    </BaseLayout>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  isDrawerOpened: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

Layout.defaultProps = {
  title: '',
  children: null,
};

const mapDataToProps = {
  submissionTasksCount: models.taskCounters(R.always(taskTypes.SUBMISSION)),
  reviewAdTasksCount: models.taskCounters(R.always(taskTypes.REVIEW_AD)),
  convertExternalUserTasksCount: models.taskCounters(
    R.always(taskTypes.CONVERT_EXTERNAL_USER),
  ),
};

const mapStateToProps = createStructuredSelector({
  isDrawerOpened: drawerSelectors.isOpenedSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  connectData(mapDataToProps, mapStateToProps, mapDispatchToProps),
  withProps(
    ({
      submissionTasksCount,
      reviewAdTasksCount,
      convertExternalUserTasksCount,
    }) => {
      const finalSubmissionTasksCount = submissionTasksCount || 0;
      const finalReviewAdTasksCount = reviewAdTasksCount || 0;
      const finalConvertExternalUserTasksCount =
        convertExternalUserTasksCount || 0;

      return {
        tasksCount: {
          total:
            finalSubmissionTasksCount +
            finalReviewAdTasksCount +
            finalConvertExternalUserTasksCount,
          submission: finalSubmissionTasksCount,
          reviewAd: finalReviewAdTasksCount,
          convertExternalUser: finalConvertExternalUserTasksCount,
        },
      };
    },
  ),
  withStyles(styles),
)(Layout);
