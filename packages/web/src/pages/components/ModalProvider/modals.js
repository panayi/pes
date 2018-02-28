import { withProps } from 'recompose';
import Login from 'modules/Login/Login';
import CreateAd from 'modules/PostAd/CreateAd/CreateAd';
import EditAd from 'modules/PostAd/EditAd/EditAd';
import Support from 'modules/Support/Support';
import SearchFilters from 'modules/Search/Filters/Filters';
import MobileMenu from 'pages/components/Header/MobileMenu/MobileMenu';
import Modal from './Modal/Modal';

const modals = {
  login: withProps({ content: Login, closeButton: true })(Modal),
  createAd: withProps({ content: CreateAd })(Modal),
  editAd: withProps({ content: EditAd })(Modal),
  support: withProps({ content: Support })(Modal),
  filters: withProps({
    content: SearchFilters,
    fullScreen: true,
    direction: 'down',
  })(Modal),
  menu: withProps({ content: MobileMenu, fullScreen: true, direction: 'down' })(
    Modal,
  ),
};

export default modals;
