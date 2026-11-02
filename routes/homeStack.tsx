import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ReviewDetails from '../screens/ReviewDetails';
import Header, { MenuButton, HeaderBackground } from '../shared/header';
import { useAppTheme } from '../styles/theme';
import type { HomeStackParamList } from './types';

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  const { colors } = useAppTheme();
  return (
  <Navigator
    screenOptions={{
      headerTintColor: colors.text,
      headerShadowVisible: false,
      headerBackground: () => <HeaderBackground />,
    }}>
    <Screen
      name="Home"
      component={Home}
      options={{
        headerTitle: () => <Header title={'GameZone'} />,
        headerTitleAlign: 'center',
        headerLeft: () => <MenuButton />,
      }}
    />
    <Screen name="ReviewDetails" component={ReviewDetails} options={{ title: 'Review' }} />
  </Navigator>
  );
};
