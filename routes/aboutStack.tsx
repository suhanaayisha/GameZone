import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from '../screens/About';
import Header, { MenuButton } from '../shared/header';
import { Image } from 'react-native';
import type { AboutStackParamList } from './types';

const { Navigator, Screen } = createNativeStackNavigator<AboutStackParamList>();

export const AboutNavigator = () => (
  <Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#eee',
      },
      headerTintColor: '#444',
    }}>
    <Screen
      name="About"
      component={About}
      options={{
        headerTitle: () => <Header title={'About'} />,
        headerTitleAlign: 'center',
        headerLeft: () => <MenuButton />,
        headerBackground: () => <Image source={require('../assets/game_bg.png')} style={{ width: '100%', height: '100%' }} />,
      }}
    />
  </Navigator>
);
