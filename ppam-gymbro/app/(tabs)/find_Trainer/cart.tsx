import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import { SearchTrainerElement } from '@/utils/searchTrainerElement';
import ReserveTrainerPlan from '@/screen/find_trainer_component/ReserveTrainerPlan';
import { Link } from 'expo-router';
import ReserveTrainerCart from '@/screen/find_trainer_component/ReserveTrainerCart';

// const screenWidth = Dimensions.get('window').width;
const screenWidth = 360;

export default function Cart() {
  const currentUserId = 1;
  
  const userCart = [
    { 
      trainerId: 1, 
      trainerName: 'Radityta Azka', 
      trainerPlan: [
        { planId: 1, planType: 'Online', planUnitPrice: 50000 },
        { planId: 2, planType: 'Offline', planUnitPrice: 80000 }
      ], 
      onlineBundle: 3,
      offlineBundle: 5
    },
    { 
      trainerId: 2, 
      trainerName: 'Albarda', 
      trainerPlan: [
        { planId: 1, planType: 'Online', planUnitPrice: 70000 },
        { planId: 2, planType: 'Offline', planUnitPrice: 10000 }
      ], 
      onlineBundle: 5,
      offlineBundle: 0
    },
  ]

  const [cart, setCart] = useState(userCart)

  const renderCart = ({item}) => {
    return (
      <View style = {{marginHorizontal: screenWidth * (5/360)}} >
        <ReserveTrainerCart 
          trainerName={item.trainerName}
          onlineBundle={item.onlineBundle}
          offlineBundle={item.offlineBundle}
          onlineUnitPrice={item.trainerPlan.find(plan => plan.planType === 'Online').planUnitPrice}
          offlineUnitPrice={item.trainerPlan.find(plan => plan.planType === 'Offline').planUnitPrice}
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
          <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360)}} />
        </View>

        <View style={{paddingHorizontal: screenWidth * (10/360)}}>
          <View style = {{flex : 1, marginTop: screenWidth * (5/360),  marginBottom: screenWidth * (10/360), paddingHorizontal: 20, flexDirection : "column", justifyContent : "flex-start", alignItems :"center"}} >
            <View style={{ paddingHorizontal: 20, alignItems: 'flex-start' }}>
              <Text style = {{fontSize : 20, fontWeight : "bold", color: '#444444' }}>Reservations</Text>
            </View>
            <View style={{ width: screenWidth* (320/360), height: 2, backgroundColor: '#E1E1E1' }}/>
          </View>
          <ReserveTrainerCart 
          trainerName={cart[1].trainerName}
          onlineBundle={cart[1].onlineBundle}
          offlineBundle={cart[1].offlineBundle}
          onlineUnitPrice={cart[1].trainerPlan.find(plan => plan.planType === 'Online').planUnitPrice}
          offlineUnitPrice={cart[1].trainerPlan.find(plan => plan.planType === 'Offline').planUnitPrice}
          />
          <ReserveTrainerCart 
          trainerName={cart[1].trainerName}
          onlineBundle={cart[1].onlineBundle}
          offlineBundle={cart[1].offlineBundle}
          onlineUnitPrice={cart[1].trainerPlan.find(plan => plan.planType === 'Online').planUnitPrice}
          offlineUnitPrice={cart[1].trainerPlan.find(plan => plan.planType === 'Offline').planUnitPrice}
          />
          {/* <ScrollView>
            <View style={{ flexDirection: 'row' }}>
              <FlatList
                horizontal={true}
                data={cart}
                renderItem={renderCart}
                keyExtractor={item => item.trainerId}
              />
            </View>
          </ScrollView> */}
          <View style = {{flex : 1, marginTop: screenWidth * (20/360),  marginBottom: screenWidth * (10/360), paddingHorizontal: 20, flexDirection : "row", justifyContent : "flex-start", alignItems :"center"}} >
            <Text style = {{fontSize : 20, fontWeight : "bold", color: '#444444' }}>Offline Plan</Text>
          </View>
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
    width: 360 , //for full screen
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