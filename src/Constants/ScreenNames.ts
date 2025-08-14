export const SCREEN_NAMES = {
  // Tab Screens
  HOME: 'Home',
  COUNTER: 'Counter',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  CHEMISTRY: 'Chemistry',

  // Stack Screens
  MAIN_TABS: 'MainTabs',

  // Modal/Additional Screens
  USER_DETAILS: 'UserDetails',
  ABOUT: 'About',
} as const;

export type ScreenNamesType = (typeof SCREEN_NAMES)[keyof typeof SCREEN_NAMES];
