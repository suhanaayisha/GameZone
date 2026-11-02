import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  Home: undefined;
  ReviewDetails: { reviewKey: string };
};

export type AboutStackParamList = {
  About: undefined;
};

export type RootDrawerParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  AboutStack: NavigatorScreenParams<AboutStackParamList>;
};
