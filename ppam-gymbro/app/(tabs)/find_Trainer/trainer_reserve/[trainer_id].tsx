import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import { SearchTrainerElement } from '@/utils/searchTrainerElement';
import ReserveTrainerPlan from '@/screen/find_trainer_component/ReserveTrainerPlan';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/utils/supabase';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
import { useCart } from '@/provider/CartProvider';

const screenWidth = Dimensions.get('window').width;

export default function TrainerReserve() {
  const currentTrainerId = 1;
  const {trainer_id} = useLocalSearchParams();
  const [loading1, setLoading1] = useState(false)
  const [trainerData, setTrainerData] = useState(null)
  const [pricingData, setPricingwData] = useState(null)
  const [loading3, setLoading3] = useState(false)
  const {cartList, addToCart, removeFromCart} = useCart()
  const getPricingData = async () => {
    setLoading3(true)
    const {data, error} = await supabase.from("Pricing_Plan").select("*").eq("id_numeric", trainer_id)
    if (error) {
      console.log("get pricing data failed",trainer_id,error)
    } else {
      setPricingwData(data)
    }
    setLoading3(false)
  }
  const getTrainerData = async () => {
    setLoading1(true)
    // console.log(trainer_id)
    const {data, error} = await supabase.from("Trainer").select("*").eq("id_numeric", trainer_id).single()
    if (error) {
      console.log("get trainer data failed",trainer_id,error)
      setLoading1(false)
    } else {
      // console.log("Get TRAINER DATA",data)
      setTrainerData(data)
      setLoading1(false)
    }
    
  }

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
    const plan = pricingData.find(plan => plan.type === planType);
  
    if (!plan) {
      return [];
    }
  
    return bundles.map(bundle => ({
      bundle,
      planType,
      planUnitPrice: plan.price,
      isSelected: false
    }));
  };

  const [onlinePlans, setOnlinePlans] = useState(null )
  const [offlinePlans, setOfflinePlans] = useState(null)

  const setSelectedOnlinePlan = (bundle) => {
    setOnlinePlans(prevData => prevData.map(item => {
      if (item.bundle === bundle) {
        // console.log(bundle)
        return { ...item, isSelected: !item.isSelected };
      } else {
        return { ...item, isSelected: false };
      }
    }))
    
  };

  const renderOnlinePlan = ({item}) => {
    return (
      <Pressable onPress={() => {setSelectedOnlinePlan(item.bundle)}}>
      <View style = {{marginHorizontal: screenWidth * (5/360)}} >
        <ReserveTrainerPlan 
          planType='Online'
          planBundle={item.bundle}
          planUnitPrice={item.planUnitPrice}
          isSelected={item.isSelected}
        />
      </View>
      </Pressable>
    )
  }

  const setSelectedOfflinePlan = (bundle) => {
    setOfflinePlans(prevData => prevData.map(item => {
      if (item.bundle === bundle) {
        // console.log(bundle)
        return { ...item, isSelected: !item.isSelected };
      } else {
        return { ...item, isSelected: false };
      }
    }));
  };

  const renderOfflinePlan = ({item}) => {
    return (
      <Pressable onPress={() => {setSelectedOfflinePlan(item.bundle)}}>
      <View style = {{marginHorizontal: screenWidth * (5/360)}} >
        <ReserveTrainerPlan 
          planType='Offline'
          planBundle={item.bundle}
          planUnitPrice={item.planUnitPrice}
          isSelected={item.isSelected}
        />
      </View>
      </Pressable>
    )
  }

  useEffect(() => { getPricingData(); getTrainerData()}, [] )
  useEffect(() => {
    console.log(pricingData)
    if (pricingData != null ) {
    setOnlinePlans(getPlansForType('Online', [3, 5, 10]) ); 
    setOfflinePlans(getPlansForType('Offline', [3, 5, 10]) )}
  }, [pricingData])

  const handlePress = () => {
    const offlineElement = offlinePlans.find(item => item.isSelected)
    const onlineElement = onlinePlans.find(item => item.isSelected)
    const newElement = {
      trainerId : trainerData.id_numeric,
      trainerName : trainerData.nama_trainer,
      onlineBundle : 0,
      offlineBundle : 0,
      onlineUnitPrice :  0,
      offlineUnitPrice : 0
    }
    if (offlineElement != null){
      newElement.offlineBundle = offlineElement.bundle
      newElement.offlineUnitPrice = offlineElement.planUnitPrice
    }
    if (onlineElement != null){
      newElement.onlineBundle = onlineElement.bundle
      newElement.onlineUnitPrice = onlineElement.planUnitPrice
      
    }
    if ((onlineElement != null) || (offlineElement != null)) {
      addToCart(newElement)
    } 
    router.navigate("/(tabs)/find_Trainer/cart")
    
  }

  if(loading3 || (pricingData == null) || (trainerData == null)) {
    return <LoadingScreen/>
  }
  

  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (25/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link href="/(tabs)/workout" asChild>
            <Pressable > 
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
        
        <TouchableOpacity onPress={() => {  handlePress()}} style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ borderRadius: 16, width: screenWidth * (300/360), height: screenWidth * (56/360), backgroundColor: '#FF7D40', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color: '#FEFEFE', fontWeight: 'bold'}}>Add To Cart</Text>
            </View>
          </TouchableOpacity>

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