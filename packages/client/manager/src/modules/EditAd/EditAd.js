import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import {
  actions as postAdActions,
  selectors as postAdSelectors,
} from '@pesposa/client-core/src/store/postAd';
import Button from '@pesposa/client-core/src/components/Button/Button';
import Link from '@pesposa/client-core/src/components/Link/Link';
import hydrateAd from '@pesposa/client-core/src/modules/Ad/hydrateAd';
import DeleteAdButton from '@pesposa/client-core/src/modules/Ad/DeleteAdButton/DeleteAdButton';
import UserImage from '@pesposa/client-core/src/modules/User/UserImage/UserImage';
import UserName from '@pesposa/client-core/src/modules/User/UserName/UserName';
import AdForm from '@pesposa/client-core/src/modules/AdForm/AdForm';
import * as adsConfig from 'config/ads';
import Panel from 'components/Panel/Panel';

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
    padding: theme.spacing.unit * 2,
  },
  seller: {
    display: 'flex',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  username: {
    marginLeft: theme.spacing.unit,
  },
  deleteButton: {
    marginLeft: theme.spacing.unit,
  },
});

class EditAd extends React.Component {
  handleSubmit = adProps => {
    const { adId, ad, saveAd } = this.props;
    return saveAd(adId, adProps, ad);
  };

  renderHeader = adFormProps => {
    const { adId, ad, classes } = this.props;
    const { dirty, submitForm } = adFormProps;

    return (
      <React.Fragment>
        <Link
          to={`/data/external-users/${ad.seller}`}
          className={classes.seller}
        >
          <UserImage userId={ad.seller} userType={ad.sellerType} />
          <div className={classes.username}>
            <UserName userId={ad.seller} userType={ad.sellerType} />
          </div>
        </Link>
        <div className={classes.buttons}>
          <Button
            onClick={() => submitForm()}
            disabled={!dirty}
            variant="raised"
            color="primary"
          >
            Save
          </Button>
          <div className={classes.deleteButton}>
            <DeleteAdButton adId={adId} ad={ad} alwaysRender />
          </div>
        </div>
      </React.Fragment>
    );
  };

  renderAdForm = adFormProps => {
    const { classes } = this.props;
    const { renderForm } = adFormProps;

    return (
      <Panel
        classes={{
          root: classes.panelRoot,
          header: classes.header,
          content: classes.content,
        }}
        header={this.renderHeader(adFormProps)}
      >
        {renderForm()}
      </Panel>
    );
  };

  render() {
    const { adId, ad, filesPath, isAdLoaded } = this.props;
    return (
      <AdForm
        adId={adId}
        ad={ad}
        filesPath={filesPath}
        isAdLoaded={isAdLoaded}
        maxImages={adsConfig.MAXIMUM_IMAGES_PER_AD}
        enableReinitialize
      >
        {this.renderAdForm}
      </AdForm>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  filesPath: postAdSelectors.adImagesPathSelector,
});

const mapDispatchToProps = {
  saveAd: postAdActions.saveAd,
  removeAd: postAdActions.removeAd,
};

export default R.compose(
  hydrateAd(propSelector(['adId'])),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(EditAd);
