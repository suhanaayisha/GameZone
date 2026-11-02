import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './routes/drawer';
import { ReviewsProvider } from './hooks/useReviews';
import { ThemeProvider } from './styles/theme';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ReviewsProvider>
          <AppNavigator />
        </ReviewsProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
