// HOME SCREEN

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/homeScreen.js'
import SplashScreen from './screens/splashScreen.js'
// import AuthNavigator from './navigations/authNavigator.js'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
      // <NavigationContainer>
      //   <AuthNavigator/>
      // </NavigationContainer>
      false
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
