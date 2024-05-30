import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import { SearchTrainerElement } from '@/utils/searchTrainerElement';


export default function Find_Trainer() {


  




  const fetchActiveTrainer = [
    {id : "1" , name : "Black Sheep", isActive : true, onlineSessions : 4, offlineSessions : 4, monthPassed : 1} ,
    {id : "2" , name : "White Sheep", isActive : true, onlineSessions : 4, offlineSessions : 4, monthPassed : 1} ,
    {id : "3" , name : "Red Sheep",  isActive : true, onlineSessions : 4, offlineSessions : 4, monthPassed : 1} ,
    {id : "4" , name : "Blue Sheep",  isActive : true, onlineSessions : 4, offlineSessions : 4, monthPassed : 1} ,
    {id : "5" , name : "Orange Sheep",  isActive : true, onlineSessions : 4, offlineSessions : 4, monthPassed : 1} ,
    {id : "6" , name : "Pink Sheep",  isActive : true, onlineSessions : 4, offlineSessions : 4, monthPassed : 1} 
  ]

  const dataActiveTrainer = fetchActiveTrainer.map(item => ({...item, isSelected : false}))

  const fetchTrainer = [
    {id : "1" , name : "Black Sheep",  isActive : false, onlineSessions : 2, offlineSessions : 6, monthPassed : 1} ,
    {id : "2" , name : "White Sheep",  isActive : false, onlineSessions : 1, offlineSessions : 2, monthPassed : 1} ,
    {id : "3" , name : "Red Sheep",  isActive : false, onlineSessions : 3, offlineSessions : 4, monthPassed : 1} ,
    {id : "4" , name : "Blue Sheep",  isActive : false, onlineSessions : 1, offlineSessions : 5, monthPassed : 1} ,
    {id : "5" , name : "Orange Sheep",  isActive : false, onlineSessions : 2, offlineSessions : 3, monthPassed : 1} ,
    {id : "6" , name : "Pink Sheep",  isActive : false, onlineSessions : 6, offlineSessions : 4, monthPassed : 1} ,
    {id : "7" , name : "Black Sheep", isActive : true, onlineSessions : 4, offlineSessions : 4, monthPassed : 1} ,
    {id : "8" , name : "White Sheep", isActive : true, onlineSessions : 4, offlineSessions : 9, monthPassed : 1} ,
    {id : "9" , name : "Red Sheep",  isActive : true, onlineSessions : 4, offlineSessions : 4, monthPassed : 1} ,
    {id : "10" , name : "Blue Sheep",  isActive : true, onlineSessions : 2, offlineSessions : 4, monthPassed : 1} ,
    {id : "11" , name : "Orange Sheep",  isActive : true, onlineSessions : 1, offlineSessions : 4, monthPassed : 1} ,
    {id : "12" , name : "Pink Sheep",  isActive : true, onlineSessions : 4, offlineSessions : 4, monthPassed : 1} 
  ]

  const dataTrainer = fetchTrainer.map(item => ({...item, isSelected : false}))
  const [trainerList, setTrainerList] = useState(dataTrainer)
  const setSelectedTrainer = (id) => {
    setTrainerList(prevData => prevData.map(item => {
      if (item.id === id) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    }));
  };
  const renderSelectTrainer = ({item}) => {
    return (
      <View style = {{margin : 2}} >
        <TrainerSelect
        id = {item.id}
        isActive = {item.isActive}
        trainerName= {item.name}
        onlineSessions={item.onlineSessions}
        offlineSessions={item.offlineSessions}
        monthPassed={item.monthPassed}
        setSelected={setSelectedTrainer}
        isSelected = {item.isSelected}
        ></TrainerSelect>
      </View>
    )
  }
  return (
    <View style={styles.layout}>
      {/* <View style={{position : "absolute", top : 0, left : 0}}> */}
        <View style = {styles.topBar}>
          {/* Yang atas */}
          <View style = {{flex : 1}}></View>
          <View style = {{flex : 4, alignItems : "center", justifyContent : "flex-start", marginTop : 5, flexDirection : "row"}}>  
            <View style={styles.searchBar}>  
              <Image source={require("@/assets/search.png")} style = {{margin : 5}}>
                {/* Icon Kaca Pembesar */}
              </Image>
              <TextInput>
                {/* Search Bar */}
              </TextInput>
            </View>
            
          </View>
        </View>
      <View>

      </View>
           <ScrollView style = {{flex : 1}}>
        <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between", alignItems :"center"}} >
          <Text style = {{fontSize : 20, fontWeight : "bold"}}> Active Trainer</Text>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={trainerList.filter(item => (item.isActive))}
          renderItem={renderSelectTrainer}
          keyExtractor={item => item.id}
          style = {{maxWidth : "100%"}} />
        </ScrollView>
        <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between", alignItems :"center"}} >
          <Text style = {{fontSize : 20, fontWeight : "bold"}}> Past Trainer</Text>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={trainerList.filter(item => !(item.isActive))}
          renderItem={renderSelectTrainer}
          keyExtractor={item => item.id}
          style = {{maxWidth : "100%"}} />
        </ScrollView>
      </ScrollView>   
    </View>

  )
}

const styles = StyleSheet.create({
  searchBar : {
    backgroundColor: '#fff', 
    justifyContent : "flex-start",
    alignItems : "center",
    flexDirection : "row",
    borderRadius : 30,
    width : "80%",
    height : "50%",
    maxHeight : 40,
    padding : 5
  },
  layout: {
    flex: 1,
    // flexDirection: 'row',
    width: Dimensions.get("window").width , //for full screen
    height: Dimensions.get("window").height, //for full screen
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    position : "relative"
  },
  topBar :{
    flex: 1,
    maxHeight : 100,
    width : "100%",
    alignItems : "center",
    justifyContent : "flex-end",
    backgroundColor : "#FF7D40",
    borderBottomLeftRadius : 20,
    borderBottomRightRadius : 20,
    marginTop : 0
  },
  filter_sort : {
  flex : 1,
   maxHeight : 100,
   width : "100%",
   alignItems : "flex-start",
   justifyContent : "flex-end",
  //  backgroundColor : "black"
  },
  tags : {
    flex : 1,
    alignItems : "center",
    backgroundColor : "#FFEAD9",
    margin : 10,
    padding : 5
  },
  item: {
    width: 100, // Set width to control the spacing between items
    height: 100,
    backgroundColor: 'blue',
    margin: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  }, 
  grey : {
    backgroundColor : "grey", 
    position : 'absolute', 
    width: Dimensions.get("window").width , //for full screen
    height: Dimensions.get("window").height, //for full screen
    top : 0, 
    left : 0,
    opacity : 0.8,
    zIndex : 1,
    justifyContent : "flex-start"
  } ,

})