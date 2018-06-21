import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import {
  actions as postAdActions,
  selectors as postAdSelectors,
} from '@pesposa/client-core/src/store/postAd';
import hydrateAd from '@pesposa/client-core/src/modules/Ad/hydrateAd';
import AdFormModal from '@pesposa/client-core/src/modules/AdForm/Modal/Modal';

const mapStateToProps = createStructuredSelector({
  filesPath: postAdSelectors.adImagesPathSelector,
});

const mapDispatchToProps = {
  saveAd: postAdActions.saveAd,
};

const EditAdContent = R.compose(
  hydrateAd(propSelector(['adId'])),
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ adId, ad, saveAd, closeModal }) => ({
    title: 'Edit your ad',
    submitButtonLabel: 'Save',
    onSubmit: async adProps => {
      await saveAd(adId, adProps, ad);
      closeModal();
    },
  })),
)(AdFormModal);

export default EditAdContent;
