import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, VirtualizedList , FlatList} from 'react-native';
import { Link } from "expo-router"
import ExcerciseProgress from '@/screen/workout_component/ExcerciseProgress';
import CustomBox from "@/screen/workout_component/CustomBox";
import Excercise from '@/screen/workout_component/Excercise';
import HomeTrainer from '@/screen/home_component/HomeTrainer';
import TrainingPlan from '@/screen/find_trainer_component/TrainingPlan';
// import {RowComp} from '@/screen/find_trainer_component/row_comp';
import ExcerciseDay from '@/screen/workout_component/ExcerciseDay';
import TrainerSelect from '@/screen/select_trainer_component/TrainerSelect';
import UserReview from '@/screen/find_trainer_component/UserReview';
import ReserveTrainerPlan from '@/screen/find_trainer_component/ReserveTrainerPlan';

const data = [
  {id : "1" , name : "Black Sheep", rating : 5 , pricee : 25500} ,
  {id : "2" , name : "White Sheep", rating : 4 , pricee : 20000} ,
  {id : "3" , name : "Red Sheep", rating : 3 , pricee : 100000} ,
  {id : "4" , name : "Blue Sheep", rating : 3 , pricee : 350000} ,
  {id : "5" , name : "Orange Sheep", rating : 3 , pricee : 350000} ,
  {id : "6" , name : "Pink Sheep", rating : 3 , pricee : 350000} 
]

// const renderItem = ({ item }) => (
//   <RowComp name={item.name} rating={item.rating} price={item.pricee} />
// );

export default function HomeScreen() {
  return (
    <View style = {styles.layout}>
    <ScrollView contentContainerStyle={styles.content_layout}>
      <View></View>
      <ReserveTrainerPlan isAdded={false} bundle={3} type='Online' unitPrice={80000} />
      <ReserveTrainerPlan isAdded={true} bundle={5} type='Online' unitPrice={80000} />
      <TrainingPlan type='Offline' price={130000}/>
      <TrainingPlan type='Offline' price={130000}/>
      <TrainingPlan type='Online' price={80000}/>
      <UserReview username='Rafi Haidar' rating={5} review='VEEEEEEEEEERYYY LOOONG TEXTTTTT :3 :3 :3 :3 :3 :3 :3 :3 :3 :3 :3 :3 :3 :3 :3 :3'/>
      <TrainerSelect isActive={true} isSelected={false} trainerName='Haidar' onlineSessions={2} offlineSessions={2}/>
      <TrainerSelect isActive={true} isSelected={true} trainerName='Haidar' onlineSessions={2} offlineSessions={2}/>
      <TrainerSelect isActive={false} isSelected={false} trainerName='Haidar' onlineSessions={2} offlineSessions={2} monthPassed={2}/>
      <TrainerSelect isActive={false} isSelected={true} trainerName='Haidar' onlineSessions={0} offlineSessions={0} monthPassed={2}/>
      <ExcerciseProgress duration={8} difficulty='Intermediate'/>
      <HomeTrainer trainerName='Rubah Kampus' sessions={3}/>
      <Excercise sets={4} reps={10} name='Push Up' isChecked={true} number={1}/>
      <Excercise sets={4} reps={10} name='Push Up' isChecked={false} number={1}/>
      <ExcerciseDay isCurrent={true} progress={3} day='1'/>
      <ExcerciseDay isCurrent={false} progress={90} day='1'/>
      <ExcerciseDay isCurrent={false} progress={100} day='1'/>
      {/* Custom box test */}
      {/* location = 'main-home */}
      <CustomBox difficulty='easy' location='main-home'/>

      {/* location = 'main-workout */}
      <CustomBox difficulty='easy' location='main-workout'/>

      {/* location = 'trainer-menu */}
      {/* isOver = False */}
      <CustomBox difficulty='easy' location='trainer-menu' isOver={false}/>
      {/* isOver = True */}
      <CustomBox difficulty='easy' location='trainer-menu' isOver={true}/>

      {/* location = 'trainer-menu */}
      {/* isOver = False */}
      <CustomBox difficulty='easy' location='trainer-menu' isOver={false}/>
      {/* isOver = True */}
      <CustomBox difficulty='easy' location='trainer-menu' isOver={true}/>

      {/* location = 'free-menu */}
      {/* isSelected = False */}
      <CustomBox difficulty='easy' location='free-menu' isSelected={false}/>
      {/* isSelected = True */}
      <CustomBox difficulty='easy' location='free-menu' isSelected={true}/>
      <View style={{flex : 0.5}}></View>

      {/* location = 'free-menu-selection */}
      {/* isSelected = False */}
      {/* isAdded = False */}
      <CustomBox difficulty='easy' location='free-menu-selection' isSelected={false} isAdded={false}/>
      {/* isAdded = True */}
      <CustomBox difficulty='easy' location='free-menu-selection' isSelected={false} isAdded={true}/>
      {/* isSelected = True */}
      {/* isAdded = False */}
      <CustomBox difficulty='easy' location='free-menu-selection' isSelected={true} isAdded={false}/>
      {/* isAdded = True */}
      <CustomBox difficulty='easy' location='free-menu-selection' isSelected={true} isAdded={true}/>
      
      <View style={{flex : 0.5}}></View>


      
      
      {/* <FlatList data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
      style = {{maxWidth : "95%"}} /> */}
    </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f4dfb9',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content_layout : {
    // flex: 1,
    // backgroundColor: '#f4dfb9',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
