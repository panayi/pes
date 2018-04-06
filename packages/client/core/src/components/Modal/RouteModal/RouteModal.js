import React from 'react';
import { Route } from 'react-router-dom';
import BaseModal from '../BaseModal/BaseModal';

const RouterModal = props => {
  const { path, parentPath, ...rest } = props;

  return (
    <Route
      path={path}
      render={({ match, history }) => (
        <BaseModal
          {...rest}
          open={!!match}
          onClose={() => history.replace(parentPath(match))}
        />
      )}
    />
  );
};

export default RouterModal;
