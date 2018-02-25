import * as navigatorService from 'services/navigator';

export const getCurrentPosition = () => () =>
  navigatorService.getCurrentPosition();
