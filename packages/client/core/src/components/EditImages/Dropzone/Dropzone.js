import React, { Component } from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactDropzone from 'react-dropzone';
import AddIcon from '@material-ui/icons/AddAPhoto';
import BlockIcon from '@material-ui/icons/Block';
import fileUtils from '@pesposa/core/src/utils/files';
import Spinner from '../../Spinner/Spinner';

// type Props = {
//   acceptedFileTypes: Array<string>,
//   onDrop: Function,
//   isLoading: Boolean,
//   accept: string,
//   className: ?string,
//   classes: Object,
// };

const styles = theme => ({
  root: {
    position: 'relative',
    height: '100%',
    border: `2px dashed ${theme.palette.grey[400]}`,
    cursor: 'pointer',
    transition: theme.transitions.create('border-color'),
    '&:hover': {
      borderColor: theme.palette.grey[300],
    },
  },
  accepted: {
    borderColor: theme.palette.grey['500'],
  },
  rejected: {
    borderColor: theme.palette.error['200'],
    color: theme.palette.error['300'],
    cursor: 'no-drop',
  },
  icon: {
    color: theme.palette.text.secondary,
  },
});

export class Dropzone extends Component {
  static defaultProps = {
    multiple: true,
    icon: null,
  };

  renderIcon(dropzoneProps) {
    const { isDragReject } = dropzoneProps;
    const { isLoading, classes } = this.props;

    if (isLoading) {
      return <Spinner size={24} spinnerWidth={3} />;
    }

    if (isDragReject) {
      return <BlockIcon />;
    }

    return <AddIcon className={classes.icon} />;
  }

  render() {
    const { onDrop, className, classes, ...otherProps } = this.props;

    return (
      <ReactDropzone
        onDropAccepted={onDrop}
        style={{ height: '100%' }}
        {...otherProps}
      >
        {dropzoneProps => (
          <Grid
            className={classNames(classes.root, className, {
              [classes.accepted]: dropzoneProps.isDragAccept,
              [classes.rejected]: dropzoneProps.isDragReject,
            })}
            container
            alignItems="center"
            justify="center"
            direction="column"
            spacing={0}
          >
            {this.renderIcon(dropzoneProps)}
          </Grid>
        )}
      </ReactDropzone>
    );
  }
}

export default R.compose(
  withProps(({ acceptedFileTypes }) => ({
    accept: fileUtils.acceptFor(acceptedFileTypes),
  })),
  withStyles(styles),
)(Dropzone);
