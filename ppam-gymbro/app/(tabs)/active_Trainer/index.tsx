import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import { SearchTrainerElement } from '@/utils/searchTrainerElement';
import { useCurrentTrainer } from '@/provider/CurrentTrainerProvider';
import { useAuth } from '@/provider/AuthProvider';
import { getMonthDiff } from '@/utils/getMonthDiffts';
const screenWidth = Dimensions.get('window').width;
import TrainerReview from '@/screen/select_trainer_component/TrainerReview';
import { Modal } from 'react-native-paper';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
export default function ActiveTrainer() {
  const currentTrainerId = 0;
  const {activeTrainer, currentTrainer, currentTrainerLoading, updateActiveTrainer, setCurrentTrainer,nonActiveTrainer} = useCurrentTrainer()
  const [pastTrainerSelected, setPastTrainerSelected ] = useState(null)


  // const activeTrainerSelection = activeTrainer.map(item => ({ ...item, isSelected: false }));
  // const pastTrainerSelection = nonActiveTrainer.map(item => ({ ...item, isSelected: false }));



  const [activeTrainerList, setActiveTrainerList] = useState(null)
  const [pastTrainerList, setPastTrainerList] = useState(null)
  const [reviewVisible , setReviewVisible] = useState<boolean>(false)

  const [search, setSearch] = useState("")


  useEffect(() => { 
    console.log("aaa",currentTrainer)
    if  ( activeTrainer != null &&   activeTrainer.length > 0 ) {
      const activeTrainerSelection = activeTrainer.map(item => ({ ...item, isSelected: false }));
      setActiveTrainerList(activeTrainerSelection)
    }
    if  ( nonActiveTrainer != null &&   nonActiveTrainer.length > 0 ) {
      const pastTrainerSelection =  nonActiveTrainer.map(item => ({ ...item, isSelected: false }));
      setPastTrainerList(pastTrainerSelection)
    }
   },[activeTrainer, nonActiveTrainer])


  // useEffect(() => {
  //   setActiveTrainerList(prevData =>
  //     prevData.map(item => {
  //       if (item.trainerId === currentTrainerId) {
  //         return { ...item, isSelected: true };
  //       } else {
  //         return { ...item, isSelected: false };
  //       }
  //     })
  //   );
  // },[activeTrainer]);

  // useEffect(() => {
  //   setPastTrainerList(prevData =>
  //     prevData.map(item => {
  //       if (item.trainerId === currentTrainerId) {
  //         return { ...item, isSelected: true };
  //       } else {
  //         return { ...item, isSelected: false };
  //       }
  //     })
  //   );
  // },[nonActiveTrainer]);

  const setSelectedActiveTrainer = (id) => {
    setActiveTrainerList(prevData => prevData.map(item => {
      if (item.id_trainer_active === id) {
        setCurrentTrainer(item)
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    }));
  };

  const renderActiveTrainer = ({item}) => {
    return (
      <View style = {{marginVertical: screenWidth * (5/360)}} >
        <TrainerSelect
        trainerId = {item.id_trainer_active}
        isActive = {item.isActive}
        trainerName= {item.nama_trainer_active}
        onlineSessions={item.onlinecount }
        offlineSessions={item.offlinecount}
        monthPassed={getMonthDiff(new Date() , new Date(item.lastsession))}
        setSelected={setSelectedActiveTrainer}
        isSelected = {item.isSelected}
        setReviewVisible={setReviewVisible}
        />
      </View>
    )
  }

  const setSelectedPastTrainer = (id) => {
    // console.log(pastTrainerList)
    setPastTrainerList(prevData => prevData.map(item => {
      if (item.id_trainer_non_active === id) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    }));
  };

  const renderPastTrainer = ({item}) => {
    return (
      <View style = {{marginVertical: screenWidth * (5/360)}} >
        <TrainerSelect
        trainerId = {item.id_trainer_non_active}
        isActive = {item.isActive}
        trainerName= {item.nama_trainer_non_active}
        onlineSessions={item.onlinecount }
        offlineSessions={item.offlinecount}
        monthPassed={getMonthDiff( new Date(item.lastsession), new Date())}
        setSelected={setSelectedPastTrainer}
        isSelected = {item.isSelected}
        setReviewVisible={setReviewVisible}
        />
      </View>
    )
  }

  useEffect(() => {console.log(reviewVisible), "ASSAF"}, [reviewVisible])

  if (currentTrainerLoading) {
    
    return <LoadingScreen></LoadingScreen>
  }

  return (
    <View style={styles.layout}>
      {/* <View style={{position : "absolute", top : 0, left : 0}}> */}
        <View style = {styles.topBar}>
          {/* Yang atas */}
          <View style = {{flex : 1}}></View>
          <View style = {{flex : 4, alignItems : "center", justifyContent : "flex-start", marginTop : 5, flexDirection : "row"}}>  
            <View style={styles.searchBar}>  
              <Image source={require("@/assets/icons/search.png")} style = {{height: 25, width: 25,margin : 5}} />
              <TextInput
                    style={{ width: screenWidth * (240 / 360), height: screenWidth * (38 / 360) }}
                    value={search}
                    onChangeText={setSearch}
                    keyboardType="default"
                    placeholder='Search Trainer'
                />
            </View>
            
          </View>
        </View>
      
        <View style = {{zIndex : 10, alignItems : "center", justifyContent : "center", position : "absolute"}}>
      <Modal visible = {reviewVisible} >
        <View style = {{alignItems : "center", justifyContent : "flex-start", }}>
        <TrainerReview  trainerName = {currentTrainer.nama_trainer_active} trainer_id = {currentTrainer.id_trainer_active}  ReviewVisible = {reviewVisible}
        setReviewVisible={setReviewVisible}></TrainerReview>
        </View>
        
      </Modal>
      </View>
      
           <ScrollView style = {{flex : 1}}>
        <View style = {{flex : 1, marginTop: screenWidth * (20/360),  marginBottom: screenWidth * (10/360), paddingHorizontal: 10, flexDirection : "row", justifyContent : "flex-start", alignItems :"center"}} >
          <Text style = {{fontSize : 20, fontWeight : "bold", color: '#444444' }}>Active Trainer</Text>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={activeTrainerList}
          renderItem={renderActiveTrainer}
          keyExtractor={item => item.trainerId}
          style = {{maxWidth : "100%"}} />
        </ScrollView>
        <View style = {{flex : 1, marginTop: screenWidth * (20/360),  marginBottom: screenWidth * (10/360), paddingHorizontal: 10, flexDirection : "row", justifyContent : "flex-start", alignItems :"center"}} >
          <Text style = {{fontSize : 20, fontWeight : "bold", color: '#444444' }}>Past Trainer</Text>
        </View>
        <ScrollView horizontal = {true}>
          <FlatList data={pastTrainerList}
          renderItem={renderPastTrainer}
          keyExtractor={item => item.trainerId}
          style = {{maxWidth : "100%"}} />
        </ScrollView>
      </ScrollView>   

      { reviewVisible &&( 
        <View style = {styles.grey}>
          <TouchableOpacity style={{flex : 1}}>
            <View style = {{flex : 1}}/>
          </TouchableOpacity>
        </View>)}
    </View>

  )
}

const styles = StyleSheet.create({
  searchBar : {
    backgroundColor: '#fff', 
    justifyContent : "flex-start",
    alignItems : "center",
    flexDirection : "row",
    borderRadius : 16,
    width : screenWidth * (320/360),
    height : screenWidth * (38/360),
    maxHeight : 40,
    paddingHorizontal: 10,
    gap: 5,
    borderWidth: 2,
    borderColor: '#EEEEEE'
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
    maxHeight : 110,
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