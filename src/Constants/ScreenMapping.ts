import React from 'react';

import HomeScreen from '@/Containers/HomeScreen';

import {SCREEN_NAMES} from './ScreenNames';

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
    icon: '🧪',
    tabBarLabel: 'Home',
  },
};

export const STACK_SCREEN_MAPPING: Record<string, ScreenConfig> = {
  [SCREEN_NAMES.MAIN_TABS]: {
    component: () => null, // This will be replaced with TabNavigator
    title: 'Main',
  },
};
