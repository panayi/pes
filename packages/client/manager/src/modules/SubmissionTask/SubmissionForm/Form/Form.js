import React from 'react';
import * as R from 'ramda';
import { renameKeys } from 'ramda-adjunct';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import Select from 'react-select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import computedProp from '@pesposa/core/src/utils/computedProp';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import LocationSelect from '../../../../components/LocationSelect/LocationSelect';

const styles = theme => ({
  select: {
    marginTop: theme.spacing.unit * 3,
  },
});

const Form = props => {
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    selectedSeller,
    sellersOptions,
    selectedSource,
    sourcesOptions,
    errors,
  } = props;

  return (
    <FormGroup>
      <TextField
        margin="dense"
        name="url"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.url}
        label="URL"
        error={R.has('url', errors)}
        helperText={errors.url}
      />
      <TextField
        margin="dense"
        name="originalId"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.originalId}
        label="Original ID"
        fullWidth
        error={R.has('originalId', errors)}
        helperText={errors.originalId}
      />
      <FormControl margin="normal">
        <Select
          name="source"
          placeholder="Select a source"
          value={selectedSource}
          onChange={({ value }) => setFieldValue('source', value, true)}
          options={sourcesOptions}
        />
        {R.has('source', errors) && (
          <FormHelperText error>{errors.source}</FormHelperText>
        )}
      </FormControl>
      <FormControl margin="normal">
        <Select
          name="seller"
          placeholder="Select a seller"
          value={selectedSeller}
          onChange={({ value }) => setFieldValue('seller', value, true)}
          options={sellersOptions}
        />
        {R.has('seller', errors) && (
          <FormHelperText error>{errors.seller}</FormHelperText>
        )}
      </FormControl>
      <LocationSelect
        value={values.location}
        onChange={value => setFieldValue('location', value, true)}
        error={errors.location}
      />
    </FormGroup>
  );
};

const mapDataToProps = {
  sellers: models.externalUsers.all,
  sources: models.sources.all,
};

const createOptionsSelector = (
  collectionSelector,
  transformOptionFn = R.identity,
) =>
  createSelector(
    collectionSelector,
    R.compose(
      R.map(
        R.compose(
          renameKeys({
            id: 'value',
            name: 'label',
          }),
          R.pick(['id', 'name']),
          transformOptionFn,
        ),
      ),
      R.defaultTo([]),
    ),
  );

const sellersOptionsSelector = createOptionsSelector(
  propSelector(['sellers']),
  R.compose(
    computedProp('id', R.prop('id')),
    computedProp('name', R.path(['profile', 'name'])),
  ),
);

const sourcesOptionsSelector = createOptionsSelector(propSelector(['sources']));

const selectedSellerSelector = createSelector(
  propSelector(['values', 'seller']),
  sellersOptionsSelector,
  (sellerId, sellersOptions) =>
    R.find(R.propEq('value', sellerId), sellersOptions),
);

const selectedSourceSelector = createSelector(
  propSelector(['values', 'source']),
  sourcesOptionsSelector,
  (sourceId, sourcesOptions) =>
    R.find(R.propEq('value', sourceId), sourcesOptions),
);

export default R.compose(
  connectData(mapDataToProps),
  withProps(
    createStructuredSelector({
      sellersOptions: sellersOptionsSelector,
      selectedSeller: selectedSellerSelector,
      sourcesOptions: sourcesOptionsSelector,
      selectedSource: selectedSourceSelector,
    }),
  ),
  withStyles(styles),
)(Form);
