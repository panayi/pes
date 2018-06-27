import * as ads from './ads';
import * as auth from './auth';
import * as categories from './categories';
import * as conversations from './conversations';
import * as convertExternalUserTasks from './convertExternalUserTasks';
import * as drafts from './drafts';
import * as externalUsers from './externalUsers';
import * as favorites from './favorites';
import * as files from './files';
import * as messages from './messages';
import * as pendingTasks from './pendingTasks';
import * as profile from './profile';
import * as ratings from './ratings';
import * as sources from './sources';
import * as sellerAds from './sellerAds';
import * as supportMessages from './supportMessages';
import * as reviewAdTasks from './reviewAdTasks';
import * as submissionTasks from './submissionTasks';
import * as locations from './locations';
import * as taskCounters from './taskCounters';

const client = {
  ads,
  categories,
  externalUsers,
  pendingTasks,
  convertExternalUserTasks,
  sources,
  reviewAdTasks,
  submissionTasks,
  auth,
  conversations,
  drafts,
  favorites,
  files,
  messages,
  profile,
  ratings,
  sellerAds,
  supportMessages,
  locations,
  taskCounters,
};

export default client;
