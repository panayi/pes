import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import Spinner from 'components/Spinner/Spinner';

const styles = theme => ({
  content: {
    width: '60vw',
    height: '34vw',
    maxHeight: '70vh',
    padding: 0,
    marginRight: '-1px', // iframe width is 100% - 1px
    [theme.breakpoints.down(theme.map.tablet)]: {
      width: '100vw',
      height: 'calc(100vh - 56px)',
      maxHeight: 'none',
      marginTop: 0,
    },
  },
  frame: {
    border: 0,
    padding: 0,
    margin: 0,
  },
  spinner: {
    zIndex: -1,
  },
});

const GoogleMapsDirections = ({
  ad,
  url,
  DialogTitle,
  DialogContent,
  classes,
}) => (
    <React.Fragment>
      <DialogTitle title={ad ? `Directions to ${ad.title}` : 'Directions'} />
      <DialogContent className={classes.content}>
        <iframe
          className={classes.frame}
          title="Directions"
          src={url}
          width="100%"
          height="100%"
        />
        <Spinner centered className={classes.spinner} />
      </DialogContent>
    </React.Fragment>
  );

export default withStyles(styles)(GoogleMapsDirections);