import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import withStyles from 'material-ui/styles/withStyles';
import DirectionsIcon from 'material-ui-icons/Directions';
import { actions as modalActions } from 'store/modals';
import Button from 'components/Button/Button';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import StaticMap from './StaticMap/StaticMap';
import MapDirectionsUrl from './MapDirectionsUrl/MapDirectionsUrl';
import GoogleMapsDirections from './GoogleMapsDirections/GoogleMapsDirections';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    cursor: 'pointer',
    outline: 0,
  },
  staticMap: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
  },
  directionsButton: {
    position: 'absolute',
    top: theme.spacing.unit,
    right: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

const Map = ({ ad, adId, staticMapProps, className, openModal, classes }) => {
  const {
    className: staticMapClassName,
    ...restStaticMapProps
  } = staticMapProps;
  return (
    <React.Fragment>
      <MapDirectionsUrl ad={ad}>
        {({ url }) => (
          <div
            className={classNames(classes.root, className)}
            onClick={() => openModal('googleMapsDirections', { ad, url })}
            role="button"
            tabIndex="-1"
          >
            <StaticMap
              id={adId}
              className={classNames(classes.staticMap, staticMapClassName)}
              center={R.path(['location', 'geoposition'], ad)}
              {...restStaticMapProps}
            />
            <Button
              className={classes.directionsButton}
              variant="raised"
              size="small"
            >
              <DirectionsIcon className={classes.leftIcon} />
              Directions
            </Button>
          </div>
        )}
      </MapDirectionsUrl>
      <ReduxModal
        id="googleMapsDirections"
        content={GoogleMapsDirections}
        maxWidth={false}
      />
    </React.Fragment>
  );
};

Map.defaultProps = {
  staticMapProps: {},
};

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(connect(null, mapDispatchToProps), withStyles(styles))(
  Map,
);
