import React from 'react';
import { withProps } from 'recompose';
import needsVisitor from '@pesposa/client-core/src/hocs/needsVisitor';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import Login from '@pesposa/client-core/src/modules/Login/Login';

const CustomLogin = withProps({
  disablePhone: true,
})(Login);

const LoginPage = () => <ReduxModal id="login" content={CustomLogin} open />;

export default needsVisitor({ redirectPath: '/' })(LoginPage);
