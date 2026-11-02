import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './routes/drawer';
import { ReviewsProvider } from './hooks/useReviews';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReviewsProvider>
        <AppNavigator />
      </ReviewsProvider>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}
