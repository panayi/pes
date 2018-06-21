import * as ads from './ads';
import * as avatars from './avatars';
import * as conversations from './conversations';
import * as drafts from './drafts';
import * as externalUsers from './externalUsers';
import * as externalUserCodes from './externalUserCodes';
import * as convertExternalUserTasks from './convertExternalUserTasks';
import * as reviewAdTasks from './reviewAdTasks';
import * as users from './users';
import * as taskCounters from './taskCounters';

const server = {
  ads,
  avatars,
  conversations,
  drafts,
  externalUsers,
  externalUserCodes,
  convertExternalUserTasks,
  reviewAdTasks,
  users,
  taskCounters,
};

export default server;
