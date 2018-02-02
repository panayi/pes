/* @flow weak */
import React, { Component } from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import classNames from 'classnames';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import ReactDropzone from 'react-dropzone';
import AddIcon from 'material-ui-icons/Add';
import BlockIcon from 'material-ui-icons/Block';
import { filetypes } from 'pesposa-utils';
import Spinner from 'components/atoms/Spinner';

type Props = {
  acceptedFileTypes: Array<string>,
  onDrop: Function,
  isLoading: Boolean,
  accept: string,
  classes: Object,
};

const dropzonePropKeys = R.keys(ReactDropzone.propTypes);

const styles = theme => ({
  root: {
    position: 'relative',
    height: '100%',
    border: `2px dashed ${theme.palette.grey['200']}`,
    cursor: 'pointer',
    transition: 'border-color 0.1s',
  },
  accepted: {
    borderColor: theme.palette.grey['500'],
  },
  rejected: {
    borderColor: theme.palette.error['200'],
    color: theme.palette.error['300'],
    cursor: 'no-drop',
  },
});

export class Dropzone extends Component<Props> {
  static defaultProps = {
    multiple: true,
    icon: null,
  };

  renderIcon(dropzoneProps) {
    const { isDragReject } = dropzoneProps;
    const { isLoading } = this.props;

    if (isLoading) {
      return <Spinner size={30} spinnerWidth={3} />;
    }

    if (isDragReject) {
      return <BlockIcon />;
    }

    return <AddIcon />;
  }

  render() {
    const { onDrop, classes, ...otherProps } = this.props;

    return (
      <ReactDropzone
        onDropAccepted={onDrop}
        {...R.pick(dropzonePropKeys, otherProps)}
      >
        {dropzoneProps => (
          <Grid
            className={classNames(classes.root, {
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
    accept: filetypes.mimeFor(acceptedFileTypes),
  })),
  withStyles(styles),
)(Dropzone);
