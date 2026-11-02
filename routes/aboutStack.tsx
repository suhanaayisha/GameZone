import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from '../screens/About';
import Header, { MenuButton, HeaderBackground } from '../shared/header';
import { useAppTheme } from '../styles/theme';
import type { AboutStackParamList } from './types';

const { Navigator, Screen } = createNativeStackNavigator<AboutStackParamList>();

export const AboutNavigator = () => {
  const { colors } = useAppTheme();
  return (
  <Navigator
    screenOptions={{
      headerTintColor: colors.text,
      headerShadowVisible: false,
      headerBackground: () => <HeaderBackground />,
    }}>
    <Screen
      name="About"
      component={About}
      options={{
        headerTitle: () => <Header title={'About'} />,
        headerTitleAlign: 'center',
        headerLeft: () => <MenuButton />,
      }}
    />
  </Navigator>
  );
};
