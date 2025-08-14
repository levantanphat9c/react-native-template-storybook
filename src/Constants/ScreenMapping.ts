import React from 'react';

import ChemistryScreen from '../Containers/Chemistry';
import {SCREEN_NAMES} from './ScreenNames';

export interface ScreenConfig {
  component: React.ComponentType<any>;
  title: string;
  icon?: string;
  tabBarLabel?: string;
}

export const TAB_SCREEN_MAPPING: Record<string, ScreenConfig> = {
  [SCREEN_NAMES.CHEMISTRY]: {
    component: ChemistryScreen,
    title: 'Hóa Học',
    icon: '🧪',
    tabBarLabel: 'Hóa Học',
  },
};

export const STACK_SCREEN_MAPPING: Record<string, ScreenConfig> = {
  [SCREEN_NAMES.MAIN_TABS]: {
    component: () => null, // This will be replaced with TabNavigator
    title: 'Main',
  },
};
