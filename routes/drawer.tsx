import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { HomeNavigator } from './homeStack';
import { AboutNavigator } from './aboutStack';
import type { RootDrawerParamList } from './types';
import { navigationTheme, useAppTheme } from '../styles/theme';
import DrawerContent from '../shared/drawerContent';

const { Navigator, Screen } = createDrawerNavigator<RootDrawerParamList>();

export const AppNavigator = () => {
  const { isDark, colors } = useAppTheme();
  return (
  <NavigationContainer theme={navigationTheme(isDark)}>
    <StatusBar style={isDark ? 'light' : 'dark'} />
    <Navigator
      initialRouteName="HomeStack"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false, drawerActiveTintColor: colors.primary }}>
      <Screen name="HomeStack" component={HomeNavigator} options={{ title: 'Home' }} />
      <Screen name="AboutStack" component={AboutNavigator} options={{ title: 'About' }} />
    </Navigator>
  </NavigationContainer>
  );
};
