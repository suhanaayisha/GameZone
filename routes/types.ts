import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Review } from '../types/review';

export type HomeStackParamList = {
  Home: undefined;
  ReviewDetails: Review;
};

export type AboutStackParamList = {
  About: undefined;
};

export type RootDrawerParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  AboutStack: NavigatorScreenParams<AboutStackParamList>;
};
