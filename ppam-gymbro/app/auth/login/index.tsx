import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';


export default function login_1() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const isButtonEnabled = username.length > 0 && password.length > 0;

  return (
    <View style={styles.layout}>
      <ScrollView contentContainerStyle={styles.scrollLayout}>
        {/* View yang isinya logo + welcome back */}
          <View style={styles.LogoSpace}>
            <Image
              style = {styles.logo}
              source = {require("../../../assets/icon.png")}
              contentFit = "contain"
            />
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.title}>Back</Text>
          </View>
          
          {/* View yang isinya input username dan password */}
          
          <View style={styles.InputSpace}>
            {/* Displaying text if the input boxes are not filled */}
            {isButtonEnabled ? (
              <Text style={styles.subtextBold}></Text>
            ) : (
              <Text style={styles.subtextBold}>Please input your username and password</Text>
            )}
            <TextInput
              style={styles.InputBox}
              placeholder="Username"
              value = {username}
              onChangeText = {setUsername}
            />

            <TextInput
              style={styles.InputBox}
              placeholder="Password"
              secureTextEntry= {true}
              value={password}
              onChangeText = {setPassword}
            />

            <Text style={styles.subtext}>Forgot your<Link href="./login/resetPassword_username_email" style={styles.subtextBold}> password</Link>?</Text>
          </View>
          
          {/* View yang isinya tombol log in */}
          <View style={styles.LowerThird}>
            <Text style={styles.subtext}>Don't have an account? <Link href="./register/registerUsername" style={styles.subtextBold}>Register</Link></Text>

            {/* Allowing the user to use the button only if the input boxes are filled */}
            {isButtonEnabled ? (
              <Link href="/(tabs)/home/" style={styles.WhiteButton}>
                <Text style={styles.buttonText}>Log In</Text>
              </Link>
            ) : (
              <View style={styles.disabledWhiteButton}>
                <Text style={styles.disabledButtonText}>Log In</Text>
              </View>
            )}
          </View>
          
        
      </ScrollView> 

      <ImageBackground 
        source={require("../../../assets/Landing - Login.png")} 
        style={[styles.fixed, styles.imageBackgroundContainer, {zIndex: -1}]}
      />
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
    width: Dimensions.get("window").width , //for full screen
    height: Dimensions.get("window").height, //for full screen
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  scrollLayout:{
    flex: 1,
    height: '100%',
    width: '100%',
  },

  imageBackgroundContainer: {
    width: Dimensions.get("window").width * 1.08, //for full screen
    // height: Dimensions.get("window").height //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: -8,
    right: 0,
    bottom: 0
  },

  imageBackground: {
    flex: 1,
    // height: "100%",
    // width: "100%",
    position: 'absolute',
    resizeMode : "stretch"
  },

  LogoSpace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 144
  },

  logo: {
    height: 109,
    width: 109,
  },

  title:{
    fontWeight: 'bold',
    fontSize: 42,
    textAlign: 'center',
    color: 'white',
  },

  InputSpace:{
    flex: 2,
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0
  },

  InputBox:{
    height: 65,
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
    // paddingVertical: 30,
    // position: 'absolute',
    // bottom: 0,
    flex: 1,
    width: "100%",
    height: '20%',
    alignItems: "center",
    justifyContent: "center",
  },

  WhiteButton:{
    marginTop:4,
    height: 65,
    width: "80%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "white",
    backgroundColor: "white",
    padding: 4,
    paddingTop: 16,
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  },

  disabledWhiteButton: {
    marginTop:4,
    height: 65,
    width: "80%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "white",
    backgroundColor: "white",
    padding: 4,
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
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

  disabledButtonText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },



});