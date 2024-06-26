import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link, useLocalSearchParams } from 'expo-router';
import Excercise from '@/screen/workout_component/Excercise';
import { supabase } from '@/utils/supabase';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
const screenWidth = Dimensions.get('window').width;

export default function ExcerciseList() {
    
    const {id_workout, day} = useLocalSearchParams()
    const [loading , setLoading] = useState(false)
    const [excerciseList, setExcerciseList] = useState(null)
    const fetch_data = async () => {
      console.log(day)
      setLoading(true)
      const {data, error} = await supabase.from("Workout").select("*").eq("id_workout_plan", id_workout)
      if (error) {
        console.log("Exercise Fetch fail", error )
      } else {
        setExcerciseList(data)
      }
      
      setLoading(false)
    }
    const calculateProgress = (day, array) => {

      // return 0
      const thisDay = array.filter(item => item.day == day)
      let done = 0
      // console.log(thisDay)
      // console.log("Ada berapa ",thisDay.length)
      for (const item of thisDay){
        console.log(item.isDone)
        if (item.isDone) {
          
          done = done + 1
        }
      }
      console.log(done)
      return (thisDay.length > 0 ? Math.round((100 * done / thisDay.length)) : 0);
  
    }
    useEffect(() => {fetch_data()}, [])
    const plan = {
        planName: "Rubah Kampus' Plan",
        planDifficulty: 'Beginner',
        planDuration: 8,
        planCategory: 'Trainer',
        currentProgress: 50,
        currentDay: 4, 
        day: [
            { day: 1, currentProgress: 100, excercise: [
                { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: true },
            ] },
            { day: 2, currentProgress: 100, excercise: [
                { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: true },
            ] },
            { day: 3, currentProgress: 100, excercise: [
                { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: true },
            ] },
            { day: 4, currentProgress: 50, excercise: [
                { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: true },
                { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: false },
                { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: false },
            ] },
            { day: 5, currentProgress: 0, excercise: [
                { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: false },
                { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: false },
                { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: false },
                { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: false },
            ] },
            { day: 6, currentProgress: 0, excercise: [
                { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: false },
                { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: false },
                { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: false },
                { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: false },
            ] },
            { day: 7, currentProgress: 0, excercise: [
                { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isDone: false },
                { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isDone: false },
                { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isDone: false },
                { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isDone: false },
            ] },
            { day: 8, currentProgress: 0, excercise: [
                { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isDone: false },
                { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isDone: false },
                { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isDone: false },
                { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isDone: false },
            ] },
        ] 
    }

  const renderExcercise = ({ item }) => {
      return (
        <View style = {{margin : 0}}>
          <Excercise excerciseId={item.id_workout} excerciseName={item.name_workout} sets={item.sets} reps={item.reps} isFinished={item.isDone}/>
        </View>
      )
  };

  if (loading || excerciseList == null ) {
    return (<LoadingScreen/>)
  }
  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (25/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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
                Day {day}
              </Text>
            </View>
            <Link href="/(tabs)/workout" asChild>
                <TouchableOpacity>
                  <View style={{ alignItems: 'center', justifyContent:'center', height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                    <Image
                      style = {{ height: 20, width: 20}}
                      source = {require("@/assets/icons/save.png")}
                    />
                  </View>
                </TouchableOpacity>
            </Link>
        </View>
        <View style={{ width: screenWidth, alignItems: 'center', marginVertical: 5 }}>
          <View style = {{ flex : 1, flexDirection : "row", justifyContent : "space-between", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (10/360), marginBottom: screenWidth * (10/360)}} >
            <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Excercises</Text>
            <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>{calculateProgress(day, excerciseList)}%</Text>
          </View>
        </View>
        <ScrollView horizontal = {true}>
            <FlatList data={excerciseList}
            renderItem={renderExcercise}
            keyExtractor={item => item.id_workout}
            style = {{maxWidth : "100%"}} />
          </ScrollView>
      </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    width: Dimensions.get("window").width , //for full screen
    height: Dimensions.get("window").height, //for full screen
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position : "relative"
  },
});