import React from 'react';
import { Control, Form } from 'react-redux-form';
import { TextField } from 'material-ui';
import { constants as filterAdsConstants } from 'store/filterAds';

const PriceFilter = () => (
    <Form model={filterAdsConstants.PRICE_MODEL_PATH}>
      <Control.text
        model=".min"
        id="min"
        label="€"
        helperText="Min"
        component={TextField}
      />
      <Control.text
        model=".max"
        id="max"
        label="€"
        helperText="Max"
        component={TextField}
      />
    </Form>
  );

export default PriceFilter;
