import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Dimensions, Image, Pressable, ScrollView, FlatList} from 'react-native';
import { Link } from "expo-router"
// import {format} from "date-fns"
import CustomBox from "@/screen/workout_component/CustomBox";
import HomeTrainer from '@/screen/home_component/HomeTrainer';

const screenWidth = Dimensions.get('window').width;


export default function HomeScreen() {
  const currentUser = 1;

  const user = {
      userFullName: "Rubah Kampus",
      currentTrainer: {trainerId : 1, trainerName : "Rafi Haidar",  isActive : false, onlineSessions : 2, offlineSessions : 6, monthPassed : 1},
      userPlan: {
        trainerPlan : [
          { planId: 1, planName: "Rafi Haidar's Plan", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Trainer', currentProgress: 50, currentDay: 4 }
        ],
        freePlan : [
          { planId: 2, planName: "Core 1", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', currentProgress: 50, currentDay: 4 },
          { planId: 3, planName: "Core 3", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', currentProgress: 50, currentDay: 4 },
          { planId: 4, planName: "Core 5", planDifficulty: 'Beginner', planDuration: 8, planCategory: 'Core', currentProgress: 50, currentDay: 4 }
        ]
      }
  }

  const renderWorkout = ({ item }) => {
      return (
        <View style = {{marginVertical: 5}}>
          <CustomBox planName={item.planName} planDifficulty={item.planDifficulty} currentProgress={item.currentProgress} location='main-home'/>
        </View>
      )
  };

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
              {user.userFullName}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#444444' }}>
              Thursday, 08 July
            </Text>
          </View>
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
          <Link href="/(tabs)/find_Trainer/[trainerProfile]" asChild>
              <Pressable> 
                <View style={{ width: 250, height: 50, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Text style = {{color: '#EFEFEF', fontSize : 16, fontWeight:"bold", }}>Trainer Profile</Text>
                </View>
              </Pressable>
          </Link>
        </View>
        {/* PLACEHOLDER LINKS NANTI DIHAPUS */}

        <HomeTrainer trainerName={user.currentTrainer.trainerName} sessions={user.currentTrainer.offlineSessions + user.currentTrainer.onlineSessions}></HomeTrainer>
        
        <View style = {{ flexDirection : "row", justifyContent : "flex-start", alignItems :"center", width: screenWidth * (320/360), paddingHorizontal: screenWidth * (15/360), marginBottom: screenWidth * (10/360), marginTop: screenWidth * (20/360)}} >
          <Text style = {{color: '#444444', fontSize : 16, fontWeight : "bold"}}>Trainer's Plan</Text>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={user.userPlan.trainerPlan}
          renderItem={renderWorkout}
          keyExtractor={item => item.planId}
          style = {{maxWidth : "100%"}} />
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
          <FlatList data={user.userPlan.freePlan}
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