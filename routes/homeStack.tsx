import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import ReviewDetails from '../screens/ReviewDetails';
import Header from '../shared/header';
import { Image } from 'react-native';
const { Navigator, Screen } = createStackNavigator();

export const HomeNavigator = (props:any) => (
    <Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#eee",
        height: 60,
      },
      headerTintColor: "#444",
    }}>
      <Screen 
        name="Home" 
        component={Home} 
        options={{ 
          headerTitle: () => <Header title={'GameZone'} navigation={props.navigation}/>,
          headerBackground: () => <Image source={require('../assets/game_bg.png')} style={{height:60}}/>
        }} 
      />
      <Screen name="ReviewDetails" component={ReviewDetails} options={{ title: 'Reviews' }}/>
    </Navigator>
);
  