import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';


export default function otp_register() {
  // const [text, onChangeText] = React.useState('');
  const [singleNumbers, setSingleNumbers] = React.useState(['', '', '', '', '']); // Array to store single numbers for each OTP box

  const handleSingleNumberChange = (index, text) => {
    // Create a new array to update the state immutably
    const newSingleNumbers = [...singleNumbers];
    // Allow only numeric characters and limit to one character
    if (/^\d?$/.test(text)) {
      // Update the single number at the specified index
      newSingleNumbers[index] = text;
      setSingleNumbers(newSingleNumbers);
    }
  };

  // Function to check if all OTP boxes are filled
  const allBoxesFilled = singleNumbers.every(number => number !== '');

  return (
    <View style={styles.layout}>
      <ScrollView contentContainerStyle={styles.scrollLayout}>
        {/* View yang isinya logo + welcome back */}
          <View style={styles.LogoSpace}>
            <Text style={styles.titleNotBold}>Enter Your</Text>
            <Text style={styles.title}>OTP</Text>
          </View>
          
          {/* View yang isinya input OTP */}
          <View style={styles.InputSpace}>
            {/* Render 5 TextInput components */}
            {singleNumbers.map((number, index) => (
              <TextInput
                key={index}
                style={styles.InputBox}
                placeholder=""
                keyboardType="numeric"
                maxLength={1}
                value={number}
                onChangeText={(text) => handleSingleNumberChange(index, text)} // Pass index to identify which input box
              />
            ))}
            
          </View>

          <View style={styles.subspace}>
            <Text style={styles.subtext}>Check your email for the OTP code</Text>
          </View>
          
          
          {/* View yang isinya tombol log in */}
          <View style={styles.LowerThird}>
            {allBoxesFilled ? (
              <Link href="./registerPassword" style={styles.WhiteButton}><Text style={styles.buttonText}>Continue</Text></Link>
            ) : (
              <View style={styles.disabledWhiteButton}>
                <Text style={styles.disabledButtonText}>Continue</Text>
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
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 64
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

  titleNotBold:{
    fontSize: 42,
    textAlign: 'center',
    color: 'white',
  },

  InputSpace:{
    flex: 1,
    flexDirection: 'row',
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 0
  },

  InputBox:{
    height: 60,
    width: 60,
    margin: 6,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "white",
    padding: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
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

  subspace:{
    flex: 1,
    height: "5%",
    width: "100%",
    marginTop: 2,
  },

  LowerThird:{
    // paddingVertical: 30,
    // position: 'absolute',
    // bottom: 0,
    flex: 2,
    marginTop: 64,
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