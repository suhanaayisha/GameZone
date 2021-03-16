import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigator } from './homeStack';
import { AboutNavigator } from './aboutStack';


const { Navigator, Screen } = createDrawerNavigator();


export const AppNavigator = () => (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen name="Home" component={HomeNavigator} />
        <Screen name="About" component={AboutNavigator} />
      </Navigator>
    </NavigationContainer>
  );