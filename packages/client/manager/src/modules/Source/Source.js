import React from 'react';
import * as R from 'ramda';
import { withProps, branch } from 'recompose';
import { connect } from 'react-redux';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@pesposa/client-core/src/components/Button/Button';
import { actions as sourcesActions } from 'store/sources';
import Panel from 'components/Panel/Panel';
import CreateSource from './CreateSource/CreateSource';
import EditSource from './EditSource/EditSource';

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

const Source = ({ sourceId, source, basePath, deleteSource, classes }) => (
  <Panel
    classes={{
      root: classes.root,
      header: classes.header,
    }}
    header={
      <React.Fragment>
        <Typography variant="title">
          {sourceId ? (source && source.name) || null : 'New Source'}
        </Typography>
        {sourceId ? (
          <Button onClick={() => deleteSource(sourceId)} size="small">
            <DeleteIcon />
          </Button>
        ) : null}
      </React.Fragment>
    }
  >
    {sourceId ? (
      <EditSource sourceId={sourceId} source={source} />
    ) : (
      <CreateSource basePath={basePath} />
    )}
  </Panel>
);

const mapDataToProps = {
  source: models.sources.one(propSelector(['sourceId'])),
};

const mapDispatchToProps = {
  deleteSource: sourcesActions.remove,
};

export default R.compose(
  withProps(props => ({
    sourceId: R.path(['match', 'params', 'sourceId'], props),
  })),
  branch(
    propSelector('sourceId'),
    connectData(mapDataToProps, null, mapDispatchToProps),
    connect(null, mapDispatchToProps),
  ),
  withStyles(styles),
)(Source);
