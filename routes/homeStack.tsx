import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ReviewDetails from '../screens/ReviewDetails';
import Header, { MenuButton } from '../shared/header';
import { Image } from 'react-native';
import type { HomeStackParamList } from './types';

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => (
  <Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#eee',
      },
      headerTintColor: '#444',
    }}>
    <Screen
      name="Home"
      component={Home}
      options={{
        headerTitle: () => <Header title={'GameZone'} />,
        headerTitleAlign: 'center',
        headerLeft: () => <MenuButton />,
        headerBackground: () => <Image source={require('../assets/game_bg.png')} style={{ width: '100%', height: '100%' }} />,
      }}
    />
    <Screen name="ReviewDetails" component={ReviewDetails} options={{ title: 'Reviews' }} />
  </Navigator>
);
