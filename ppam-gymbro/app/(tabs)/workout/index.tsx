import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link } from 'expo-router';
import { Image } from 'expo-image';

const screenWidth = Dimensions.get('window').width;

export default function MainWorkout() {
  const trainerWorkout = [
    {id : "1" , category: 'core', name : "Core Plan 1", difficulty: 'Beginner', type: 'trainer'} ,
    {id : "2" , category: 'core', name : "Core Plan 2", difficulty: 'Beginner', type: 'trainer'} ,
    {id : "3" , category: 'core', name : "Core Plan 3", difficulty: 'Beginner', type: 'trainer'} ,
  ]
  const userWorkout = [
    {id : "1" , category: 'core', name : "Core A", difficulty: 'Beginner', type: 'free'} ,
    {id : "2" , category: 'core', name : "Core B", difficulty: 'Beginner', type: 'free'} ,
    {id : "3" , category: 'core', name : "Core C", difficulty: 'Beginner', type: 'free'} ,
  ]
  const renderWorkout = ({ item }) => {
    
      return (
        <View style = {{paddingVertical : screenWidth * (5/360)}}>
          <CustomBox name={item.name} difficulty={item.difficulty} location='main-workout'/>
        </View>
      )
  };

  return (
    <View style={styles.layout}>
      {/* <View style = {styles.topBar}> */}
          {/* Yang atas */}
          
          {/* <View style = {{flex : 1, justifyContent : "center", alignItems : "center"}}> */}
            {/* <Text style = {{fontSize : 24, fontWeight : "bold"}}>Workout Plan</Text> */}
          {/* </View> */}
          {/* <View style = {{flex : 4, alignItems : "center", justifyContent : "flex-start", marginTop : 5, flexDirection : "row"}}>  
          </View> */}
      {/* </View> */}

      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (35/360), justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
            Workout Plan
          </Text>
        </View>
        <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (10/360), marginBottom: screenWidth * (10/360)}} >
          <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Tailored Plan</Text>
          <Link href="/(tabs)/workout/TrainerWorkout/" asChild>
            <Pressable> 
              <Text style = {{color: '#444444', fontSize : 16, fontWeight:"300"}}>Browse All</Text>
            </Pressable>
          </Link>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={trainerWorkout}
          renderItem={renderWorkout}
          keyExtractor={item => item.id}
          style = {{maxWidth : "100%"}} />
        </ScrollView>
        <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (10/360), marginBottom: screenWidth * (10/360), marginTop: screenWidth * (20/360)}} >
          <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Free Plan</Text>
          <Link href="/(tabs)/workout/FreeWorkout/" asChild>
            <Pressable> 
              <Text style = {{color: '#444444', fontSize : 16, fontWeight:"300"}}>Browse All</Text>
            </Pressable>
          </Link>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={userWorkout}
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