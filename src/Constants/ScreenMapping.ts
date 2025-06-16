import React from 'react';

import {SCREEN_NAMES} from './ScreenNames';
import HomeScreen from '../Containers/HomeScreen';
import CounterScreen from '../Containers/CounterScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import SettingsScreen from '../Containers/SettingsScreen';

export interface ScreenConfig {
  component: React.ComponentType<any>;
  title: string;
  icon?: string;
  tabBarLabel?: string;
}

export const TAB_SCREEN_MAPPING: Record<string, ScreenConfig> = {
  [SCREEN_NAMES.HOME]: {
    component: HomeScreen,
    title: 'Home',
    icon: '🏠',
    tabBarLabel: 'Home',
  },
  [SCREEN_NAMES.COUNTER]: {
    component: CounterScreen,
    title: 'Counter',
    icon: '🔢',
    tabBarLabel: 'Counter',
  },
  [SCREEN_NAMES.PROFILE]: {
    component: ProfileScreen,
    title: 'Profile',
    icon: '👤',
    tabBarLabel: 'Profile',
  },
  [SCREEN_NAMES.SETTINGS]: {
    component: SettingsScreen,
    title: 'Settings',
    icon: '⚙️',
    tabBarLabel: 'Settings',
  },
};

export const STACK_SCREEN_MAPPING: Record<string, ScreenConfig> = {
  [SCREEN_NAMES.MAIN_TABS]: {
    component: () => null, // This will be replaced with TabNavigator
    title: 'Main',
  },
};
