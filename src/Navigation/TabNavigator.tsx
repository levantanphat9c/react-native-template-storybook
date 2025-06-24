import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text} from 'react-native';

import {TAB_SCREEN_MAPPING} from '../Constants/ScreenMapping';
import {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {Object.entries(TAB_SCREEN_MAPPING).map(([screenName, config]) => (
        <Tab.Screen
          key={screenName}
          name={screenName as keyof MainTabParamList}
          component={config.component}
          options={{
            title: config.title,
            tabBarLabel: config.tabBarLabel,
            tabBarIcon: ({color}) => (
              <Text style={{color, fontSize: 18}}>{config.icon}</Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
