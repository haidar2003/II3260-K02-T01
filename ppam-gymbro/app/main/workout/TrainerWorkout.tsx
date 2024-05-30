import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link } from 'expo-router';
import { Image } from 'expo-image';


export default function TrainerWorkout() {
    const trainerWorkout = [
        {id : "1" , category: 'core', name : "Core Plan 1", difficulty: 'easy', type: 'trainer'} ,
        {id : "2" , category: 'core', name : "Core Plan 2", difficulty: 'easy', type: 'trainer'} ,
        {id : "3" , category: 'core', name : "Core Plan 3", difficulty: 'easy', type: 'trainer'} ,
        {id : "4" , category: 'core', name : "Core Plan 4", difficulty: 'easy', type: 'trainer'} ,
      ]

    const finishedWorkout = [
        {id : "5" , category: 'core', name : "Core Plan 5", difficulty: 'easy', type: 'trainer'} ,
        {id : "6" , category: 'core', name : "Core Plan 6", difficulty: 'easy', type: 'trainer'} ,
        {id : "7" , category: 'core', name : "Core Plan 7", difficulty: 'easy', type: 'trainer'} ,
        {id : "8" , category: 'core', name : "Core Plan 8", difficulty: 'easy', type: 'trainer'} ,
      ]
  const renderWorkout = ({ item }) => {
    
      return (
        <View style = {{padding : 5}}>
          <CustomBox name={item.name} difficulty={item.difficulty} location='main-workout'/>
        </View>
      )
  };

  return (
    <View style={styles.layout}>
      <View style = {styles.topBar}>
          {/* Yang atas */}
          
          <View style = {{flex : 1, justifyContent : "flex-start",flexDirection : "row", alignItems : "center", width : "100%", padding : 15}}>
            <Link href="/main/workout" asChild>
                <Pressable> 
                    <Text style = {{fontSize : 18, fontWeight : "bold"}}>Back</Text>
                </Pressable>
            </Link>
            <View style = {{flex : 1}} />
            <Text style = {{fontSize : 24, fontWeight : "bold"}}>Trainer Plan</Text>
            <View style = {{flex : 1.2}} />
          </View>
          {/* <View style = {{flex : 4, alignItems : "center", justifyContent : "flex-start", marginTop : 5, flexDirection : "row"}}>  
          </View> */}
      </View>

      <ScrollView style = {{flex : 1}}>
        <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between", alignItems :"center"}} >
          <Text style = {{fontSize : 20, fontWeight : "bold"}}> Active Plan</Text>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={trainerWorkout}
          renderItem={renderWorkout}
          keyExtractor={item => item.id}
          style = {{maxWidth : "100%"}} />
        </ScrollView>
        <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between", alignItems :"center"}} >
          <Text style = {{fontSize : 20, fontWeight : "bold"}}> Finished Plan</Text>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={finishedWorkout}
          renderItem={renderWorkout}
          keyExtractor={item => item.id}
          style = {{maxWidth : "100%"}} />
        </ScrollView>
      </ScrollView>



      {/* <ScrollView contentContainerStyle={styles.scrollLayout}> */}
        {/* View yang isinya logo + welcome back */}
          {/* <View style={styles.LogoSpace}>
            <Text style={styles.titleNotBold}>Start You</Text>
            <Text style={styles.title}>Workout Journey</Text>
          </View> */}
          
          {/* View yang isinya input username dan email*/}
          {/* <View style={styles.InputSpace}> */}
            {/* Displaying text if the input boxes are not filled */}
            {/* {isButtonEnabled ? (
              <Text style={styles.subtextBold}></Text>
            ) : (
              <Text style={styles.subtextBold}>Please input your username and email</Text>
            )}
            <TextInput
              style={styles.InputBox}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            /> */}
{/* 
            <TextInput
              style={styles.InputBox}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            /> */}

          {/* </View> */}
          
          {/* View yang isinya tombol log in */}
          {/* <View style = {styles.LowerThird}>
            {isButtonEnabled ? (
                <Link href="./registerOTP" style={styles.WhiteButton}>
                  <Text style={styles.buttonText}>Continue</Text>
                </Link>
              ) : (
                <View style={styles.disabledWhiteButton}>
                  <Text style={styles.disabledButtonText}>Continue</Text>
                </View>
              )}
            </View> */}
        
      {/* </ScrollView>  */}

      {/* <ImageBackground 
        source={require("../../../assets/Landing - Login.png")} 
        style={[styles.fixed, styles.imageBackgroundContainer, {zIndex: -1}]}
      /> */}
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
  topBar :{
    flex: 1,
    maxHeight : 100,
    width : "100%",
    alignItems : "center",
    justifyContent : "flex-end",
    backgroundColor : "lightgrey",
    marginTop : 0,
    paddingTop : 10
  },
  layout: {
    flex: 1,
    // flexDirection: 'row',
    width: Dimensions.get("window").width , //for full screen
    height: Dimensions.get("window").height, //for full screen
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position : "relative"
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

  titleNotBold:{
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