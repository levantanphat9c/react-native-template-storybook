import {SCREEN_NAMES} from '../Constants/ScreenNames';

export type RootStackParamList = {
  [SCREEN_NAMES.MAIN_TABS]: undefined;
  [SCREEN_NAMES.PROFILE]: {userId?: string};
  [SCREEN_NAMES.SETTINGS]: undefined;
};

export type MainTabParamList = {
  [SCREEN_NAMES.HOME]: undefined;
  [SCREEN_NAMES.COUNTER]: undefined;
  [SCREEN_NAMES.PROFILE]: undefined;
  [SCREEN_NAMES.SETTINGS]: undefined;
};
