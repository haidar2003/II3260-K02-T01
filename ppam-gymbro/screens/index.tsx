import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
// import React, {useEffect} from "react";
import React, { useCallback, useEffect, useState } from 'react';
// import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();



export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (

    <View style={styles.layout}>
      <View style={styles.logo}>
        <Image
          source={require('@/assets/splash2.png')}
          style={{
                     flex:1, resizeMode: 'cover'
                 }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    height: '20%',
    width: '90%',
    backgroundColor: '#f4dfb9',
    margin: 12,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerFont: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'left',
    color: 'black',
  },

  headerSubFont: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
  },

  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
