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
    <div className={classNames(classes.root, className)}>
      <StaticMap
        id={adId}
        className={classNames(classes.staticMap, staticMapClassName)}
        center={R.path(['location', 'geoposition'], ad)}
        {...restStaticMapProps}
      />
      <MapDirectionsUrl ad={ad}>
        {({ url }) => (
          <Button
            className={classes.directionsButton}
            variant="raised"
            size="small"
            onClick={() => openModal('googleMapsDirections', { ad, url })}
          >
            <DirectionsIcon className={classes.leftIcon} />
            Directions
          </Button>
        )}
      </MapDirectionsUrl>
      <ReduxModal
        id="googleMapsDirections"
        content={GoogleMapsDirections}
        maxWidth={false}
      />
    </div>
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
