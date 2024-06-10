import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link, useLocalSearchParams } from 'expo-router';
import Excercise from '@/screen/workout_component/Excercise';
import { supabase } from '@/utils/supabase';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
const screenWidth = Dimensions.get('window').width;

export default function ExcerciseList() {
    const currentDay = 4;
    const {id_workout, day} = useLocalSearchParams()
    const [loading , setLoading] = useState(false)
    const [excerciseList, setExcerciseList] = useState(null)
    const fetch_data = async () => {
      setLoading(true)
      const {data, error} = await supabase.from("workout").select("*").eq("id_workout_plan", id_workout)
      if (error) {
        console.log("Exercise Fetch fail", error )
      } else {
        setExcerciseList(data)
      }
    }
    const calculateProgress = (day, array) => {
      const thisDay = array.filter(item => item.day == day)
      let done = 0
      for (const item of thisDay){
        if (item.isDone) {
          done += 1
        }
      }
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
          <Excercise excerciseId={item.excerciseId} excerciseName={item.excerciseName} sets={item.sets} reps={item.reps} isFinished={item.isDone}/>
        </View>
      )
  };

  if (loading  ) {
    return (<LoadingScreen/>)
  }
  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (25/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Link href="/(tabs)/workout" asChild>
              <Pressable> 
                <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                </View>
              </Pressable>
            </Link>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
                Day {currentDay}
              </Text>
            </View>
            <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360) }}/>
        </View>
        <View style={{ width: screenWidth, alignItems: 'center', marginVertical: 5 }}>
          <View style = {{ flex : 1, flexDirection : "row", justifyContent : "space-between", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (10/360), marginBottom: screenWidth * (10/360)}} >
            <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Excercises</Text>
            <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>{calculateProgress(currentDay, excerciseList)}%</Text>
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