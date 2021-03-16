import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import About from '../screens/About';
import Header from '../shared/header';
import { Image } from 'react-native';

const { Navigator, Screen } = createStackNavigator();

export const AboutNavigator = (props: any) => (
    <Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#eee",
        height: 60,
      },
      headerTintColor: "#444",
    }}>
      <Screen name="About" component={About} options={{ 
        headerTitle: () => <Header title={'About'} navigation={props.navigation}/>,
        headerBackground: () => <Image source={require('../assets/game_bg.png')} style={{height:60}}/>
        }} />
    </Navigator>
);