import { StyleSheet, Text, View, ScrollView, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link, useLocalSearchParams } from 'expo-router';
import { useWorkout } from '@/provider/WorkoutProvider';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
import { useEffect, useState } from 'react';
const screenWidth = Dimensions.get('window').width;

export default function FreeWorkoutSelection() {
    const chosenCategory = 'Core';
    const {workout_plan_type} = useLocalSearchParams();
    const {workoutList, getWorkoutList, workoutLoading} = useWorkout()
    const [SelectionFreeWorkout, setSelectionFreeWorkout] = useState(null)
    const chosenFreeWorkout = [
        { planId: 1, name_workout_plan: "Core 1", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: false, currentProgress: 50, currentDay: 4 },
        { planId: 2, name_workout_plan: "Core 2", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: true, currentProgress: 50, currentDay: 4 },
        { planId: 3, name_workout_plan: "Core 3", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: false, currentProgress: 50, currentDay: 4 },
        { planId: 4, name_workout_plan: "Core 4", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: false, currentProgress: 50, currentDay: 4 },
        { planId: 5, name_workout_plan: "Core 5", planDifficulty: 'Intermediate', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: true, currentProgress: 50, currentDay: 4 },
        { planId: 6, name_workout_plan: "Core 6", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: true, currentProgress: 50, currentDay: 4 },
        { planId: 7, name_workout_plan: "Core 7", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: false, currentProgress: 50, currentDay: 4 },
        { planId: 8, name_workout_plan: "Core 8", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: false, currentProgress: 50, currentDay: 4 },
    ]


  const renderFreeWorkout = ({ item }) => {
      return (
        <TouchableOpacity onPress={ () => {setSelectedFreeWorkout(item.id_workout_plan)}}>
        <View style = {{marginVertical : screenWidth * (5/360)}}>
          <CustomBox planName={item.name_workout_plan} planDifficulty={item.planDifficulty} currentProgress={item.currentProgress} freeWorkoutIsSelected={item.isSelected} freeWorkoutIsAdded={item.is_active} location='free-menu-selection'/>
        </View>
        </TouchableOpacity>
      )
  };

  const setSelectedFreeWorkout = (id) => {
    setSelectionFreeWorkout(prevData => prevData.map(item => {

      if (item.id_workout_plan === id) {

        return { ...item, isSelected: true }
      } else {
        
        return { ...item, isSelected: false }
      }
        
    }))
  }

  useEffect(() => { 
    if  ( workoutList != null &&   workoutList.length > 0 ) {
      console.log(workoutList)
      const  SelectionFreeWorkoutInit1 = workoutList.filter((item) => (item.planCategory == workout_plan_type) && (item.is_active))
      const SelectionFreeWorkoutInit2 = SelectionFreeWorkoutInit1.map(item => ({ ...item, isSelected: false }));
      setSelectionFreeWorkout(SelectionFreeWorkoutInit2)
    }
    
   },[workoutList])

  if (workoutLoading) {
    return <LoadingScreen/>
  }
  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (5/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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
                {workout_plan_type}
              </Text>
            </View>
            <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360) }}/>
        </View>
        <ScrollView horizontal = {true}>
            <FlatList data={SelectionFreeWorkout}
            renderItem={renderFreeWorkout}
            keyExtractor={item => item.planId}
            style = {{maxWidth : "100%"}} />
        </ScrollView>
      </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
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
});

