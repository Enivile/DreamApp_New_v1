import React, { useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { MiniPlayerProvider } from './src/context/MiniPlayerContext';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <MiniPlayerProvider>
          <AppNavigator />
        </MiniPlayerProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
};

export default App;