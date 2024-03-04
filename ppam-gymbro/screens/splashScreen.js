import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, {useEffect} from "react";

export default function SplashScreen(props) {
  const nav = props.navigation
  useEffect(() => {
    const timeOutSplashScreen = setTimeout(() => { nav.navigate('Home')} , 5000)
  },[])
  return (

    <View style={styles.layout}>

      <LogoText/>

      <View style={styles.logo}>
        <Image
          source={require('../assets/Racist_Cat.webp')}
          style={{width: 120, height: 120, borderRadius: 12}}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const LogoText = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerFont}>GYMBRO</Text>
      <View style={{margin: 12}}>
        <Text style={styles.headerSubFont}>Your Fitness Companion :D</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f4dfb9',
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
