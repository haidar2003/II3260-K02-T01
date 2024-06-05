import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import { SearchTrainerElement } from '@/utils/searchTrainerElement';
import ReserveTrainerPlan from '@/screen/find_trainer_component/ReserveTrainerPlan';
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function TrainerReserve() {
  const currentTrainerId = 1;
  
  const trainer = {
    trainerId: 1,
    trainerName: 'Radityta Azka',
    trainerUsername: 'iyaq',
    trainerRating: 4,
    trainerCity: 'Bandung',
    trainerReview: [
      { reviewId: 1, userFullName: 'Rafi Haidar', rating: 4, review: 'Lorem Ipsum Dolor Sit Amet Wakakakakakkakakakakak' },
      { reviewId: 2, userFullName: 'Kean Santang', rating: 4, review: 'Lorem Ipsum Dolor Sit Amet Wakakakakakkakakakakak' },
      { reviewId: 3, userFullName: 'X', rating: 4, review: 'Lorem Ipsum Dolor Sit Amet Wakakakakakkakakakakak' },
    ],
    trainerPlan: [
      { planId: 1, planType: 'Online', planUnitPrice: 50000 },
      { planId: 2, planType: 'Offline', planUnitPrice: 80000 }
    ],
    trainerDescription: 'Saya adalah seorang personal trainer dengan 5 tahun lebih pengalaman melatih binaragawan lokal di daerah Bandung.',
    trainerTags: ['tag 1', 'asdtag 2', 'taasdasdasdasg 3', 'taasdasdg 4', 'taasdg 4', 'tag 4', 'taasdasdasdasdg 4']
  }

  const getPlansForType = (planType, bundles) => {
    const plan = trainer.trainerPlan.find(plan => plan.planType === planType);
  
    if (!plan) {
      return [];
    }
  
    return bundles.map(bundle => ({
      bundle,
      planType,
      planUnitPrice: plan.planUnitPrice,
      isSelected: false
    }));
  };

  const [onlinePlans, setOnlinePlans] = useState(getPlansForType('Online', [3, 5, 10]))
  const [offlinePlans, setOfflinePlans] = useState(getPlansForType('Offline', [3, 5, 10]))

  const setSelectedOnlinePlan = (bundle) => {
    setOnlinePlans(prevData => prevData.map(item => {
      if (item.bundle === bundle) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    }));
  };

  const renderOnlinePlan = ({item}) => {
    return (
      <View style = {{marginHorizontal: screenWidth * (5/360)}} >
        <ReserveTrainerPlan 
          planType='Online'
          planBundle={item.bundle}
          planUnitPrice={item.planUnitPrice}
          isSelected={item.isSelected}
        />
      </View>
    )
  }

  const setSelectedOfflinePlan = (bundle) => {
    setOfflinePlans(prevData => prevData.map(item => {
      if (item.bundle === bundle) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    }));
  };

  const renderOfflinePlan = ({item}) => {
    return (
      <View style = {{marginHorizontal: screenWidth * (5/360)}} >
        <ReserveTrainerPlan 
          planType='Offline'
          planBundle={item.bundle}
          planUnitPrice={item.planUnitPrice}
          isSelected={item.isSelected}
        />
      </View>
    )
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
              Reserve Trainer
            </Text>
          </View>
          <Link href="/(tabs)/workout" asChild>
            <Pressable> 
              <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
              </View>
            </Pressable>
          </Link>
        </View>

        <View style={{paddingHorizontal: screenWidth * (10/360)}}>
          <View style = {{flex : 1, marginTop: screenWidth * (5/360),  marginBottom: screenWidth * (10/360), paddingHorizontal: 20, flexDirection : "row", justifyContent : "flex-start", alignItems :"center"}} >
            <Text style = {{fontSize : 20, fontWeight : "bold", color: '#444444' }}>Online Plan</Text>
          </View>
          <ScrollView>
            <View style={{ flexDirection: 'row' }}>
              <FlatList
                horizontal={true}
                data={onlinePlans}
                renderItem={renderOnlinePlan}
                keyExtractor={item => item.bundle}
              />
            </View>
          </ScrollView>
          <View style = {{flex : 1, marginTop: screenWidth * (20/360),  marginBottom: screenWidth * (10/360), paddingHorizontal: 20, flexDirection : "row", justifyContent : "flex-start", alignItems :"center"}} >
            <Text style = {{fontSize : 20, fontWeight : "bold", color: '#444444' }}>Offline Plan</Text>
          </View>
          <ScrollView>
            <View style={{ flexDirection: 'row' }}>
              <FlatList
                horizontal={true}
                data={offlinePlans}
                renderItem={renderOfflinePlan}
                keyExtractor={item => item.bundle}
              />
            </View>
          </ScrollView>
        </View>
        
        
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
    width : screenWidth * (318/360),
    height : screenWidth * (38/360),
    maxHeight : 40,
    padding : 5,
    borderWidth: 2,
    borderColor: '#EEEEEE',
    marginTop: 5
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