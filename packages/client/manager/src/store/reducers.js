import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import modalsReducer, {
  constants as modalConstants,
} from '@pesposa/client-core/src/store/modals';
import responsiveReducer, {
  constants as responsiveConstants,
} from '@pesposa/client-core/src/store/responsive';
import searchReducers from '@pesposa/client-core/src/store/search';
import postAdReducer, {
  constants as postAdConstants,
} from '@pesposa/client-core/src/store/postAd';
import filterCollectionReducer from './filterCollection';
import drawerReducer from './drawer';

export default combineReducers({
  firebase: firebaseStateReducer,
  [modalConstants.ROOT_KEY]: modalsReducer,
  [responsiveConstants.ROOT_KEY]: responsiveReducer,
  filterCollection: filterCollectionReducer,
  drawer: drawerReducer,
  [postAdConstants.ROOT_KEY]: postAdReducer,
  ...searchReducers,
});
