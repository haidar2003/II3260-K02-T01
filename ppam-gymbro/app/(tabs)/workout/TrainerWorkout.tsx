import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link, router } from 'expo-router';
import { useWorkout } from '@/provider/WorkoutProvider';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
const screenWidth = Dimensions.get('window').width;

export default function TrainerWorkout() {
    const {workoutList, getWorkoutList, workoutLoading} = useWorkout()

    // trainerWorkoutIsOver, kalau trainer nggak aktif = true
  const renderWorkoutActive = ({ item }) => {
    if (item.isActive){
      return (
        <TouchableOpacity onPress={()=> {console.log("ASF",item);router.navigate("/(tabs)/workout/Plan/"+item.id_workout_plan);}}>
        <View style = {{padding : 5}}>
          <CustomBox planName={item.name_workout_plan} planDifficulty={item.planDifficulty} currentProgress={item.currentProgress} location='trainer-menu'/>
        </View>
        </TouchableOpacity>
      )
    }
  };

  const renderWorkoutFinished = ({ item }) => {
    console.log("ASF",item)
    if (!item.isActive){
      return (
        <TouchableOpacity onPress={()=> {;router.navigate("/(tabs)/workout/Plan/"+item.id_workout_plan)}}>
        <View style = {{padding : 5}}>
          <CustomBox planName={item.name_workout_plan} planDifficulty={item.planDifficulty} currentProgress={item.currentProgress} location='trainer-menu'/>
        </View>
        </TouchableOpacity>
      )
    }
};

  if (workoutLoading) {
    return <LoadingScreen/>
  }
  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (10/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link href="/(tabs)/workout" asChild>
              <TouchableOpacity>
                  <View style={{ alignItems: 'center', justifyContent:'center', height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                      <Image
                      style = {{ height: 25, width: 25, marginRight: 5 }}
                      source = {require("@/assets/icons/back.png")}
                      />
                  </View>
              </TouchableOpacity>
          </Link>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
              Trainer Plan
            </Text>
          </View>
          <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360) }}/>
        </View>
        <View style = {{ flexDirection : "row", justifyContent : "flex-start", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (15/360), marginBottom: screenWidth * (10/360)}} >
          <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Active Plan</Text>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={workoutList.filter( (item) => item.planCategory == "Trainer")}
          renderItem={renderWorkoutActive}
          keyExtractor={item => item.planId}
          style = {{maxWidth : "100%"}} />
        </ScrollView>
        <View style = {{ flexDirection : "row", justifyContent : "flex-start", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (15/360), marginBottom: screenWidth * (10/360), marginTop: screenWidth * (20/360)}} >
          <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Finished Plan</Text>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={workoutList.filter( (item) => item.planCategory == "Trainer")}
          renderItem={renderWorkoutFinished}
          keyExtractor={item => item.planId}
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