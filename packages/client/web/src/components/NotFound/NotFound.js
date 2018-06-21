import React from 'react';
import ErrorPage from 'components/ErrorPage/ErrorPage';

const NotFound = () => (
  <ErrorPage
    title="Page not found"
    body="The requested page does not exist. Please go to the Pesposa home page by clicking the button below."
  >
    {({ PrimaryButton }) => (
      <React.Fragment>
        <PrimaryButton href="/">Pesposa Home</PrimaryButton>
      </React.Fragment>
    )}
  </ErrorPage>
);

export default NotFound;
