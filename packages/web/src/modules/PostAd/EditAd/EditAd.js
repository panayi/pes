/* @flow */
import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import {
  actions as postAdActions,
  selectors as postAdSelectors,
} from 'store/postAd';
import hydrateAd from 'hocs/hydrateAd';
import AdForm from '../AdForm/AdForm';

const mapStateToProps = createStructuredSelector({
  filesPath: postAdSelectors.adImagesPathSelector,
});

const mapDispatchToProps = {
  saveAd: postAdActions.saveAd,
};

const EditAdContent = R.compose(
  hydrateAd(propSelector(['adId'])),
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ adId, saveAd, closeModal }) => ({
    title: 'Edit your ad',
    submitButtonLabel: 'Save',
    onSubmit: async ad => {
      await saveAd(adId, ad);
      closeModal();
    },
  })),
)(AdForm);

export default EditAdContent;
