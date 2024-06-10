import { StyleSheet, Text, View, ScrollView, Dimensions, FlatList, Image, Pressable, TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router';
import ExcerciseDay from '@/screen/workout_component/ExcerciseDay';
import ExcerciseProgress from '@/screen/workout_component/ExcerciseProgress';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
const screenWidth = Dimensions.get('window').width;
import { useWorkout } from '@/provider/WorkoutProvider';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
export default function Plan() {
  const { Plan } = useLocalSearchParams()
  const [loading, setLoading] = useState(false)
  const [excerciseList, setExcerciseList] = useState(null)
  const { workoutList, getWorkoutList, workoutLoading } = useWorkout()
  const [dayList, setDayList] = useState(null)
  const workoutPlan = workoutList.find(item => item.id_workout_plan == Plan)
  const fetch_data = async () => {
    setLoading(true)
    console.log("H",Plan)
    console.log("HF",workoutList)
    console.log("HFG",workoutPlan)
    const { data, error } = await supabase.from("Workout").select("*").eq("id_workout_plan", Plan)
    if (error) {
      console.log("Exercise Fetch fail", error)
      setLoading(false)
      return
    } else {
      const lastDay = getMaxDay(data)
      const dayInput = []
      for (let i = 1; i <= lastDay; i++){
        let NewDay = { day : i , currentProgress : calculateProgress(i, data)} 
        dayInput.push(NewDay)

      }

      setExcerciseList(data)
      setDayList(dayInput)
      // console.log(dayInput)
      setLoading(false)
      // const { data : data2, error : error2 } = await supabase.from("Workout_Plan").select("*").eq("id_workout_plan", Plan).single()
      // if (error2) {
      //   console.log(error2)
      // } else {}
      return
    }
  }

  useEffect(() => { fetch_data()}, [] )

  const getMaxDay = (array) => {
    return array.reduce((max, item) => (item.day > max ? item.day : max), 0);
  };
  const CurrentDay = (array) => {
    let i = 1
    let cday = 1
    const max = array.length
    if (max <= 0  ) {
      return 1
    }
    else {
      while (i <= max) {
        if (array[i].currentProgress >= 99) {
          if (cday <= array[i].day ) {
            cday = array[i].day + 1
          }

        }

      }
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
  const plan = {
    planName: "Rubah Kampus' Plan",
    planDifficulty: 'Beginner',
    planDuration: 8,
    planCategory: 'Trainer',
    currentProgress: 50,
    currentDay: 4,
    day: [
      {
        day: 1, currentProgress: 100, excercise: [
          { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: true },
        ]
      },
      {
        day: 2, currentProgress: 100, excercise: [
          { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: true },
        ]
      },
      {
        day: 3, currentProgress: 100, excercise: [
          { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: true },
        ]
      },
      {
        day: 4, currentProgress: 50, excercise: [
          { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: true },
          { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: false },
        ]
      },
      {
        day: 5, currentProgress: 0, excercise: [
          { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: false },
        ]
      },
      {
        day: 6, currentProgress: 0, excercise: [
          { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: false },
        ]
      },
      {
        day: 7, currentProgress: 0, excercise: [
          { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: false },
        ]
      },
      {
        day: 8, currentProgress: 0, excercise: [
          { excerciseId: 1, excerciseName: 'Push Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 2, excerciseName: 'Pull Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 3, excerciseName: 'Sit Up', sets: 2, reps: 4, isFinished: false },
          { excerciseId: 4, excerciseName: 'Back Up', sets: 2, reps: 4, isFinished: false },
        ]
      },
    ]
  }

  const renderDay = ({ item }) => {

    return (
      <TouchableOpacity onPress={ () => {router.navigate("/workout/Exercise/"+Plan+"?day="+item.day); }}>
        <View style={{ margin: 0, width: '100%' }}>
          <ExcerciseDay day={item.day} currentProgress={item.currentProgress} isCurrent={item.day === CurrentDay ? true : false} />
        </View>
      </TouchableOpacity>
    )
  };

  if (loading || workoutLoading) {
    console.log(loading)
    console.log(workoutLoading)
    return <LoadingScreen />
  }

  return (
    <View style={styles.layout} >
      <View style={{ width: '100%', marginTop: screenWidth * (420 / 360), paddingVertical: screenWidth * (20 / 360), paddingHorizontal: screenWidth * (25 / 360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#444444' }}>
            {plan.planName}
          </Text>
        </View>
        <View style={{ height: screenWidth * (56 / 360), width: screenWidth * (56 / 360) }} />
      </View>
      <View>
        <ExcerciseProgress planDifficulty={workoutPlan.planDifficulty} planDuration={workoutPlan.planDuration} currentDay={workoutPlan.currentDay} currentProgress={workoutPlan.currentProgress} />
      </View>
      <View style={{ backgroundColor: '#FEFEFE', alignItems: 'center', borderRadius: 32, marginTop: screenWidth * (110 / 720) }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: screenWidth * (20 / 720), marginTop: screenWidth * (-65 / 720), width: screenWidth * (65 / 360), height: screenWidth * (65 / 360), borderRadius: 60, backgroundColor: '#FF7D40' }}>
          <Image
            style = {{ height: 25, width: 25, marginRight: 0 }}
            source = {require("@/assets/icons/continue_plan.png")}
            />
        </View>
        <View>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <ScrollView horizontal={true}>
                <FlatList
                  data={dayList}
                  renderItem={renderDay}
                  keyExtractor={item => item.day}
                  style={{ maxWidth: "100%" }}
                />
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>

  )
}


const styles = StyleSheet.create({
  layout: {
    flex: 1,
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height, //for full screen
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEAD9',
    position: "relative"
  },
});