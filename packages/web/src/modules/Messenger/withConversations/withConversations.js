import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';

const mapDataToProps = {
  conversations: models.conversations.all,
};

export default connectData(mapDataToProps);
