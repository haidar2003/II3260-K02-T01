import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Circle } from 'react-native-progress';
import { useWorkout } from '@/provider/WorkoutProvider';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
const screenWidth = Dimensions.get('window').width;

function WorkoutCategory() {
  

  return (
    <View style={{width: screenWidth * (325/360), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25
      }}>
        <View style={styles.categoryContainer}>
          <View style={styles.circle}>

          </View>
          <Text style={styles.smallText}>
            Full Body
          </Text>
        </View>
        <View style={styles.categoryContainer}>
          <View style={styles.circle}>

          </View>
          <Text style={styles.smallText}>
            Weight
          </Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25
      }}>
        <View style={styles.categoryContainer}>
          <View style={styles.circle}>

          </View>
          <Text style={styles.smallText}>
            Upper Body
          </Text>
        </View>
        <View style={styles.categoryContainer}>
          <View style={styles.circle}>

          </View>
          <Text style={styles.smallText}>
            Yoga
          </Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25
      }}>
        <View style={styles.categoryContainer}>
          <View style={styles.circle}>

          </View>
          <Text style={styles.smallText}>
            Lower Body
          </Text>
        </View>
        <View style={styles.categoryContainer}>
          <View style={styles.circle}>

          </View>
          <Text style={styles.smallText}>
            Running
          </Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25
      }}>
        <View style={styles.categoryContainer}>
          <View style={styles.circle}>

          </View>
          <Text style={styles.smallText}>
            Core
          </Text>
        </View>
        <View style={styles.categoryContainer}>
          <View style={styles.circle}>

          </View>
          <Text style={styles.smallText}>
            Rucking
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function FreeWorkout() {
    const [freeWorkoutList, setFreeWorkoutList] = useState(null)
    const {workoutList, getWorkoutList, workoutLoading} = useWorkout()
    const [SelectionFreeWorkout, setSelectionFreeWorkout] = useState(null)
    const userFreeWorkout = [
        { planId: 1, planName: "Core 1", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, FreeWorkoutIsAdded: true, currentProgress: 50, currentDay: 4 },
        { planId: 2, planName: "Core 2", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, FreeWorkoutIsAdded: true, currentProgress: 50, currentDay: 4 },
        { planId: 3, planName: "Core 3", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, FreeWorkoutIsAdded: true, currentProgress: 50, currentDay: 4 },
        { planId: 4, planName: "Core 4", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, FreeWorkoutIsAdded: true, currentProgress: 50, currentDay: 4 },
    ]
    // freeWorkoutIsSelected (kalau dipencet), FreeWorkoutIsAdded di database
  const renderWorkout = ({ item }) => {
    
      return (
       <Pressable onPress={ () => {setSelectedFreeWorkout(item.id_workout_plan)} }> 
        <View style = {{padding : 5}}>
          <CustomBox planName={item.name_workout_plan} planDifficulty={item.planDifficulty} currentProgress={item.currentProgress} freeWorkoutIsSelected={item.isSelected} location='free-menu'/>
        </View>
        </Pressable>
      )
  };
  
  useEffect(() => { 
    if  ( workoutList != null &&   workoutList.length > 0 ) {
      const  SelectionFreeWorkoutInit1 = workoutList.filter((item) => item.planCategory != "Trainer")
      const SelectionFreeWorkoutInit2 = SelectionFreeWorkoutInit1.map(item => ({ ...item, isSelected: false }));
      setSelectionFreeWorkout(SelectionFreeWorkoutInit2)
    }
    
   },[workoutList])

  const setSelectedFreeWorkout = (id) => {
    setSelectionFreeWorkout(prevData => prevData.map(item => {

      if (item.id_workout_plan === id) {

        return { ...item, isSelected: true }
      } else {
        
        return { ...item, isSelected: false }
      }
        
    }))
  }
  if (workoutLoading) {
    return <LoadingScreen/>
  }

  return (
    <View style={styles.layout}>
      {/* <View style = {styles.topBar}>
          Yang atas
          
          <View style = {{flex : 1, justifyContent : "flex-start",flexDirection : "row", alignItems : "center", width : "100%", padding : 15}}>
            <Link href="/(tabs)/workout" asChild>
                <Pressable> 
                    <Text style = {{fontSize : 18, fontWeight : "bold"}}>Back</Text>
                </Pressable>
            </Link>
            <View style = {{flex : 1}} />
            <Text style = {{fontSize : 24, fontWeight : "bold"}}>Free Plan</Text>
            <View style = {{flex : 1.2}} />
          </View>
          <View style = {{flex : 4, alignItems : "center", justifyContent : "flex-start", marginTop : 5, flexDirection : "row"}}>  
          </View>
      </View> */}

      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (10/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link href="/(tabs)/workout" asChild>
            <Pressable> 
              <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
              </View>
            </Pressable>
          </Link>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
              Free Plan
            </Text>
          </View>
          <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360) }}/>
        </View>
        <WorkoutCategory />
        <View style = {{ flexDirection : "row", justifyContent : "flex-start", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (15/360), marginBottom: screenWidth * (10/360),marginTop: screenWidth * (30/360)}} >
          <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Active Plan</Text>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={SelectionFreeWorkout.filter((item) => item.planCategory != "Trainer")}
          renderItem={renderWorkout}
          keyExtractor={item => item.id_workout_plan}
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
  circle: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7D40',
    borderRadius: 64
  },
  smallText: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  categoryContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  }
});