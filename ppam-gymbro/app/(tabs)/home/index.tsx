import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Dimensions, Image, Pressable, ScrollView, FlatList} from 'react-native';
import { Link, router } from "expo-router"
// import {format} from "date-fns"
import CustomBox from "@/screen/workout_component/CustomBox";
import HomeTrainer from '@/screen/home_component/HomeTrainer';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/provider/AuthProvider';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
import { useEffect, useState } from 'react';
const screenWidth = Dimensions.get('window').width;
import { useCurrentTrainer } from '@/provider/CurrentTrainerProvider';

export default function HomeScreen() {
  const currentUser = 1;
  const {session,authLoading,userData,getSession,updateUserData} = useAuth()
  const [loading, setLoading] = useState(false)
  const [trainerPlan,setTrainerPlan ] = useState(null) 
  const [freePlan,setFreePlan ] = useState(null) 
  const {activeTrainer, currentTrainer, currentTrainerLoading, updateActiveTrainer, setCurrentTrainer, currentTrainerSession} = useCurrentTrainer()
  const fetchIntialData = async () => {
    console.log("Home Initial Data    :",userData)
    setLoading(true)
    const {data : trainerPlanData, error : trainerPlanError} = await supabase.from("Workout_Plan").select("id_workout_plan ,name_workout_plan, planDifficulty, planDuration, planCategory, currentProgress, currentDay" ).eq("id_user", userData.id_user).eq("planCategory", "Trainer")
    if (trainerPlanError) {
      console.log(trainerPlanError)
    } else {
      setTrainerPlan(trainerPlanData)
    }
    setLoading(false)
    const {data : freePlanData, error : freePlanError} = await supabase.from("Workout_Plan").select("id_workout_plan ,name_workout_plan, planDifficulty, planDuration, planCategory, currentProgress, currentDay" ).eq("id_user", userData.id_user).neq("planCategory", "Trainer")
    if (freePlanError) {
      console.log(freePlanError)
    } else {
      setFreePlan(freePlanData)
    }
  }
  const user = {
      userFullName: "Rubah Kampus",
      currentTrainer: {trainerId : 1, trainerName : "Rafi Haidar",  isActive : false, onlineSessions : 2, offlineSessions : 6, monthPassed : 1},
      userPlan: {
        trainerPlan : [
          { planId: 1, name_workout_plan: "Rafi Haidar's Plan", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Trainer', currentProgress: 50, currentDay: 4 }
        ],
        freePlan : [
          { planId: 2, name_workout_plan: "Core 1", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', currentProgress: 50, currentDay: 4 },
          { planId: 3, name_workout_plan: "Core 3", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', currentProgress: 50, currentDay: 4 },
          { planId: 4, name_workout_plan: "Core 5", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', currentProgress: 50, currentDay: 4 }
        ]
      }
  }

  const renderWorkout = ({ item }) => {
      return (
        <View style = {{marginVertical: 5}}>
          <CustomBox planName={item.name_workout_plan} planDifficulty={item.planDifficulty} currentProgress={item.currentProgress} location='main-home'/>
        </View>
      )
  };

  useEffect( () => {fetchIntialData()} ,[currentTrainer, userData])

  if (authLoading || loading) {
    return <LoadingScreen/>
  }
  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (5/360), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 20}}>
          <Link href="/(tabs)/workout" asChild>
            <Pressable> 
              <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
              </View>
            </Pressable>
          </Link>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#8F8F8F' }}>
              {userData.nama_user}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#444444' }}>
              Thursday, 08 July
            </Text>
          </View>
        </View>

        {currentTrainer ?  <HomeTrainer trainerName={currentTrainer.nama_trainer} sessions={currentTrainerSession}></HomeTrainer> : 
        <Text>Tidak ada Trainer yang aktif </Text>
        }
        
        {/* PLACEHOLDER LINKS NANTI DIHAPUS */}
        <View style = {{flex : 1, flexDirection : "column", justifyContent : "center", alignItems :"center", paddingVertical: screenWidth * (20/360), backgroundColor: 'lightgrey'}} >
          <Link href="/(tabs)/workout/Plan" asChild>
              <Pressable> 
                <View style={{ width: 230, height: 30, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Plan Template</Text>
                </View>
              </Pressable>
          </Link>
          <Link href="/(tabs)/workout/ExcerciseList" asChild>
              <Pressable> 
                <View style={{ width: 230, height: 30, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Plan Excercise List</Text>
                </View>
              </Pressable>
          </Link>
          <Link href="/(tabs)/workout/FreeWorkoutSelection" asChild>
              <Pressable> 
                <View style={{ width: 230, height: 30, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Free Excercise Selection</Text>
                </View>
              </Pressable>
          </Link>
          <Link href="/(tabs)/find_Trainer/[trainerProfile]" asChild>
              <Pressable> 
                <View style={{ width: 230, height: 30, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Trainer</Text>
                </View>
              </Pressable>
          </Link>
          <Link href="/(tabs)/find_Trainer/TrainerReserve" asChild>
              <Pressable> 
                <View style={{ width: 230, height: 30, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Trainer Reserve</Text>
                </View>
              </Pressable>
          </Link>
          <Link href="/(tabs)/find_Trainer/Cart" asChild>
              <Pressable> 
                <View style={{ width: 230, height: 30, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Cart</Text>
                </View>
              </Pressable>
          </Link>
          <Link href="/(tabs)/find_Trainer/Invoice" asChild>
              <Pressable> 
                <View style={{ width: 230, height: 30, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Invoice</Text>
                </View>
              </Pressable>
          </Link>
          <Link href="/(tabs)/message_trainer" asChild>
              <Pressable> 
                <View style={{ width: 230, height: 30, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Chat List</Text>
                </View>
              </Pressable>
          </Link>
          <Link href="(tabs)/message_trainer/TrainerChat" asChild>
              <Pressable> 
                <View style={{ width: 230, height: 30, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Chat</Text>
                </View>
              </Pressable>
          </Link>
        </View>
        {/* PLACEHOLDER LINKS NANTI DIHAPUS */}

        <View style = {{ flexDirection : "row", justifyContent : "flex-start", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (15/360), marginBottom: screenWidth * (10/360), marginTop: screenWidth * (20/360)}} >
          <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Trainer's Plan</Text>
        </View>
        <ScrollView horizontal = {true}>
          {trainerPlan ? (
            <FlatList data={trainerPlan}
            renderItem={renderWorkout}
            keyExtractor={item => item.planId}
            style = {{maxWidth : "100%"}} />
          ) : <Text>No Trainer Workout Plan</Text>}

        </ScrollView>

        <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (15/360), marginBottom: screenWidth * (10/360), marginTop: screenWidth * (15/360)}} >
          <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Tailored Plan</Text>
          <Link href="/(tabs)/workout/TrainerWorkout/" asChild>
            <Pressable> 
              <Text style = {{color: '#444444', fontSize : 16, fontWeight:"300"}}>Browse All</Text>
            </Pressable>
          </Link>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={freePlan}
          renderItem={renderWorkout}
          keyExtractor={item => item.planId}
          style = {{maxWidth : "100%"}} />
        </ScrollView>
      </ScrollView>
    </View>
    // <View style={styles.layout} >
    //   <View style = {{flex : 1, width : "100%", flexDirection : "column", alignItems : "center", justifyContent : "flex-end", backgroundColor : "white"}}>
    //   <Link href={"/(tabs)/home/profile"} asChild>
    //     <Pressable>
    //     <View style = {{flex : 1, width : "100%", flexDirection : "row", alignItems : "center", justifyContent : "flex-start"}}> 
        

        
    //       <Image style = {{width : "20%", aspectRatio : 1, borderRadius : 1000, margin : 10}} source={require("@/assets/profile_picture_placeholder.jpg")}/>
    //       <View style ={{flex : 1, flexDirection : "column"}}>
    //         <Text style = {{fontSize : 12}}> Hello Arnold Schwarzenegger!</Text>
    //         {/* <Text style = {{fontSize : 18, fontWeight : "bold"}}>{format(new Date(), 'EEEE, dd MMMM') } </Text> */}
    //       </View>
        
    //     </View>
    //     </Pressable>
    //     </Link>  
    //   </View>
    //   <View style = {{flex : 2 ,width : "100%", alignItems : "center"}}>
    //     <HomeTrainer trainerName='Rubah Kampus' sessions={3}></HomeTrainer>
    //   </View>
    //   <View style = {{flex : 2,width : "100%"}}>
    //     <Text style = {{fontWeight : "bold", fontSize : 16, marginHorizontal : 40}}> Trainer Plan</Text>
    //     <View style = {{flex : 1, width : "100%", alignItems : "center"}}>
    //       <CustomBox difficulty='easy' location='main-home' type='trainer-plan' name='Core Plan 1'/>
    //     </View>
    //   </View>
    //   <View style = {{flex : 2,width : "100%"}}>
    //   <Text style = {{fontWeight : "bold", fontSize : 16, marginHorizontal : 40}}> Personal Plan</Text>
    //     <View style = {{flex : 1, width : "100%", alignItems : "center"}}>
    //       <CustomBox difficulty='easy' location='main-home' type='trainer-plan' name='Core Plan 2'/>
    //     </View>
    //   </View>

    //   {/* PLACEHOLDER LINKS NANTI DIHAPUS */}
    //   <View style = {{flex : 1, flexDirection : "column", justifyContent : "center", alignItems :"center", marginVertical: screenWidth * (20/360), backgroundColor: 'lightgrey'}} >
    //       <Link href="/(tabs)/workout/Plan" asChild>
    //           <Pressable> 
    //             <View style={{ width: 150, height: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
    //               <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Plan Template</Text>
    //             </View>
    //           </Pressable>
    //       </Link>
    //       <Link href="/(tabs)/workout/ExcerciseList" asChild>
    //           <Pressable> 
    //             <View style={{ width: 150, height: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
    //               <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Plan Excercise List</Text>
    //             </View>
    //           </Pressable>
    //       </Link>
    //       <Link href="/(tabs)/workout/FreeWorkoutSelection" asChild>
    //           <Pressable> 
    //             <View style={{ width: 250, height: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
    //               <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Free Excercise Selection</Text>
    //             </View>
    //           </Pressable>
    //       </Link>
    //     </View>
    //     {/* PLACEHOLDER LINKS NANTI DIHAPUS */}

    // </View>
  );
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
})