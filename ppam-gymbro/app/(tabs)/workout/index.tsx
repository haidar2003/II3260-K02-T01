import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link, router } from 'expo-router';
import { Image } from 'expo-image';
import { useWorkout } from '@/provider/WorkoutProvider';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
const screenWidth = Dimensions.get('window').width;

export default function MainWorkout() {
  const {workoutList, getWorkoutList, workoutLoading} = useWorkout()
  const userWorkout = [
    { planId: 1, planName: "Trainer X's Plan", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Trainer', trainerWorkoutIsOver: false, currentProgress: 50, currentDay: 4 },
    { planId: 2, planName: "Trainer X's Plan", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Trainer', trainerWorkoutIsOver: false, currentProgress: 50, currentDay: 4 },
    { planId: 3, planName: "Trainer X's Plan", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Trainer', trainerWorkoutIsOver: false, currentProgress: 50, currentDay: 4 },
    { planId: 4, planName: "Trainer X's Plan", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Trainer', trainerWorkoutIsOver: false, currentProgress: 50, currentDay: 4 },
    { planId: 5, planName: "Core 1", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', currentProgress: 50, currentDay: 4 },
    { planId: 6, planName: "Lower Body 2", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Lower Body', currentProgress: 50, currentDay: 4 },
    { planId: 7, planName: "Yoga 4", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Yoga', currentProgress: 50, currentDay: 4 },
    { planId: 8, planName: "Rucking 2", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Rucking', currentProgress: 50, currentDay: 4 },
  ]

  

  const renderTrainerWorkout = ({ item }) => {
    if (item.planCategory === 'Trainer')
      return (

        <View style = {{paddingVertical : screenWidth * (5/360)}}>
          <CustomBox planId={item.id_workout_plan} planName={item.name_workout_plan} planDifficulty={item.planDifficulty} currentProgress={item.currentProgress} location='main-workout'/>
        </View>

      )
  };

  const renderFreeWorkout = ({ item }) => {
    if (!(item.planCategory === 'Trainer'))
      return (
        <View style = {{paddingVertical : screenWidth * (5/360)}}>
          <CustomBox planId={item.id_workout_plan} planName={item.name_workout_plan} planDifficulty={item.planDifficulty} currentProgress={item.currentProgress} location='main-workout'/>
        </View>
      )
};
  if (workoutLoading ) {
    return <LoadingScreen/>
  }

  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (35/360), justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
            Workout Plan
          </Text>
        </View>
        {/* PLACEHOLDER LINKS NANTI DIHAPUS */}
        <View style = {{flex : 1, flexDirection : "column", justifyContent : "center", alignItems :"center", marginVertical: screenWidth * (20/360), backgroundColor: 'lightgrey'}} >
          <Link href="/(tabs)/workout/Plan" asChild>
              <Pressable> 
                <View style={{ width: 150, height: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Plan Template</Text>
                </View>
              </Pressable>
          </Link>
          <Link href="/(tabs)/workout/ExcerciseList" asChild>
              <Pressable> 
                <View style={{ width: 150, height: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Plan Excercise List</Text>
                </View>
              </Pressable>
          </Link>
          <Link href="/(tabs)/workout/FreeWorkoutSelection" asChild>
              <Pressable> 
                <View style={{ width: 250, height: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Free Excercise Selection</Text>
                </View>
              </Pressable>
          </Link>
        </View>
        {/* PLACEHOLDER LINKS NANTI DIHAPUS */}

        <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (10/360), marginBottom: screenWidth * (10/360)}} >
          <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Tailored Plan</Text>
          <Link href="/(tabs)/workout/TrainerWorkout/" asChild>
            <Pressable> 
              <Text style = {{color: '#444444', fontSize : 16, fontWeight:"300"}}>Browse All</Text>
            </Pressable>
          </Link>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={workoutList.filter(item => item.is_active)}
          renderItem={renderTrainerWorkout}
          keyExtractor={item => item.id_workout_plan}
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
          <FlatList data={workoutList.filter(item => item.is_active)}
          renderItem={renderFreeWorkout}
          keyExtractor={item => item.id_workout_plan}
          style = {{maxWidth : "100%"}} />
        </ScrollView>
      </ScrollView>
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