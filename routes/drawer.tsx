import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigator } from './homeStack';
import { AboutNavigator } from './aboutStack';
import type { RootDrawerParamList } from './types';

const { Navigator, Screen } = createDrawerNavigator<RootDrawerParamList>();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
      <Screen name="HomeStack" component={HomeNavigator} options={{ title: 'Home' }} />
      <Screen name="AboutStack" component={AboutNavigator} options={{ title: 'About' }} />
    </Navigator>
  </NavigationContainer>
);
