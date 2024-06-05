import { StyleSheet, Text, View, ScrollView, Dimensions, FlatList, Pressable } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link } from 'expo-router';
const screenWidth = Dimensions.get('window').width;

export default function FreeWorkoutSelection() {
    const chosenCategory = 'Core';

    const chosenFreeWorkout = [
        { planId: 1, planName: "Core 1", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: false, currentProgress: 50, currentDay: 4 },
        { planId: 2, planName: "Core 2", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: true, currentProgress: 50, currentDay: 4 },
        { planId: 3, planName: "Core 3", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: false, currentProgress: 50, currentDay: 4 },
        { planId: 4, planName: "Core 4", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: false, currentProgress: 50, currentDay: 4 },
        { planId: 5, planName: "Core 5", planDifficulty: 'Intermediate', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: true, currentProgress: 50, currentDay: 4 },
        { planId: 6, planName: "Core 6", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: true, currentProgress: 50, currentDay: 4 },
        { planId: 7, planName: "Core 7", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: false, currentProgress: 50, currentDay: 4 },
        { planId: 8, planName: "Core 8", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', freeWorkoutIsSelected: false, freeWorkoutIsAdded: false, currentProgress: 50, currentDay: 4 },
    ]


  const renderFreeWorkout = ({ item }) => {
      return (
        <View style = {{marginVertical : screenWidth * (5/360)}}>
          <CustomBox planName={item.planName} planDifficulty={item.planDifficulty} currentProgress={item.currentProgress} freeWorkoutIsSelected={false} freeWorkoutIsAdded={item.freeWorkoutIsAdded} location='free-menu-selection'/>
        </View>
      )
  };

  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (5/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Link href="/(tabs)/workout" asChild>
              <Pressable> 
                <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                </View>
              </Pressable>
            </Link>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
                {chosenCategory}
              </Text>
            </View>
            <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360) }}/>
        </View>
        <ScrollView horizontal = {true}>
            <FlatList data={chosenFreeWorkout}
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

