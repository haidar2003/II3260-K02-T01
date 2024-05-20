import { StyleSheet, Text, View, TextInput, ImageBackground} from 'react-native';
import { Link } from "expo-router"
import { Image } from 'expo-image';


import React from 'react';

export default function login_1() {
  const [text, onChangeText] = React.useState('');

  return (
    <View style={styles.layout}>
      <ImageBackground source={require("../../../assets/Landing - Login.png")} style={styles.imageBackground}>
        <View style={styles.LogoSpace}>
          <Image
            style = {styles.logo}
            source = {require("../../../assets/icon.png")}
            contentFit = "cover"
          />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.title}>Back</Text>
        </View>
        
        <View style={styles.InputSpace}>
          <TextInput
            style={styles.InputBox}
            placeholder="Username"
            value={text}
          />

          <TextInput
            style={styles.InputBox}
            placeholder="Password"
            value={text}
          />

          <Text style={styles.subtext}>Forgot your<Link href="" style={styles.subtextBold}> password</Link>?</Text>
        </View>
        
        <View style={styles.LowerThird}>
          <Text style={styles.subtext}>Don't have an account? <Link href="" style={styles.subtextBold}>Register</Link></Text>
          {/* <Link href="" style={styles.WhiteButton}><Text style={styles.buttonText}>Log In</Text></Link> */}
          <WhiteButton text="Log In"></WhiteButton>
        </View>
      </ImageBackground>
    </View> 
  )
}

const image = "ppam-gymbro\assets\Landing - Login.png"

const WhiteButton = (props) => {
  return(
    <View style={[styles.WhiteButton, styles.WhiteButtonElevation]}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%"
  },

  LogoSpace: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0
  },

  logo: {
    height: 109,
    width: 109,
    marginBottom: 4,
  },

  title:{
    fontWeight: 'bold',
    fontSize: 42,
    textAlign: 'center',
    color: 'white',
  },

  InputSpace:{
    flex: 3,
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 210,
    marginTop: 0
  },

  InputBox:{
    height: "17.5%",
    width: "80%",
    margin: 6,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "white",
    padding: 4,
    paddingLeft: 21,
    backgroundColor: "white"
  },

  subtext:{
    fontSize: 16,
    textAlign: "center",
    color: "white"
  },

  subtextBold:{
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },

  LowerThird:{
    paddingVertical: 30,
    position: 'absolute',
    bottom: 0,
    width: "100%",
    height: '20%',
    alignItems: "center",
    justifyContent: "center",
  },

  WhiteButton:{
    marginTop:4,
    height: "60%",
    width: "80%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "white",
    backgroundColor: "white",
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold"
  },

  WhiteButtonElevation:{
    elevation: 15,
    shadowColor: '#black',
  },

  buttonText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },



});