import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import { SearchTrainerElement } from '@/utils/searchTrainerElement';
import ReserveTrainerPlan from '@/screen/find_trainer_component/ReserveTrainerPlan';
import { Link } from 'expo-router';
import ReserveTrainerCart from '@/screen/find_trainer_component/ReserveTrainerCart';
import { useCart } from '@/provider/CartProvider';

const screenWidth = Dimensions.get('window').width;

export default function Cart() {
  const currentUserId = 1;
  const {cartList, addToCart, removeFromCart} = useCart()
  
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
      onlineBundle: 0,
      offlineBundle: 3
    },
  ]

  const [cart, setCart] = useState(userCart)
  const [isSelected, setSelection] = useState(false);

  const handlePress = () => {
      console.log('test')
      setSelection(!isSelected);
  };

  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
  
    for (const item of cart) {
      const { onlineUnitPrice,offlineUnitPrice, onlineBundle, offlineBundle } = item;
  
      let finalOnlinePrice = 0;
      let finalOfflinePrice = 0;
  
      let onlineDiscount = 0;
      if (onlineBundle === 5) {
        onlineDiscount = 0.05;
      } else if (onlineBundle === 10) {
        onlineDiscount = 0.1;
      }
      finalOnlinePrice = onlineUnitPrice * onlineBundle * (1 - onlineDiscount);

      let offlineDiscount = 0;
      if (offlineBundle === 5) {
        offlineDiscount = 0.05;
      } else if (offlineBundle === 10) {
        offlineDiscount = 0.1;
      }
      finalOfflinePrice = offlineUnitPrice * offlineBundle * (1 - offlineDiscount);
  
      totalPrice += finalOnlinePrice + finalOfflinePrice;
    }
  
    return totalPrice;
  };

  const renderCart = ({item}) => {
    return (
      <View style={{ marginVertical: screenWidth * (10/360) }}>
        <ReserveTrainerCart 
          id = {item.id}
          trainerName={item.trainerName}
          onlineBundle={item.onlineBundle}
          offlineBundle={item.offlineBundle}
          onlineUnitPrice={item.onlineUnitPrice}
          offlineUnitPrice={item.offlineUnitPrice}
          removeFromCart={removeFromCart}
        />
      </View>
    )
  }

  useEffect(() => console.log(cartList) ,[cartList])
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
              Cart
            </Text>
          </View>
          <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360)}} />
        </View>

        <View style={{alignItems: 'center'}}>
          <View style = {{ flex : 1,  marginBottom: screenWidth * (10/360), paddingHorizontal: 20, flexDirection : "column", justifyContent : "center", alignItems :"flex-start"}} >
            <View style={{ paddingHorizontal: 5, alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 10 }}>
              <Text style = {{fontSize : 20, fontWeight : "bold", color: '#444444' }}>Reservations</Text>
            </View>
            <View style={{ width: screenWidth * (320/360), height: 2, backgroundColor: '#E1E1E1' }}/>
          </View>

          <ScrollView horizontal = {true}>
            { (cartList.length > 0) && <FlatList
              data={cartList}
              renderItem={renderCart}
              keyExtractor={item => item.id}
            />}
          </ScrollView>

          <View style = {{ flex : 1,  marginBottom: screenWidth * (10/360), paddingHorizontal: 20, flexDirection : "column", justifyContent : "center", alignItems :"flex-start", marginTop: screenWidth * (10/360) }} >
            <View style={{ paddingHorizontal: 5, alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 10 }}>
              <Text style = {{fontSize : 20, fontWeight : "bold", color: '#444444' }}>Payment Options</Text>
            </View>
            <View style={{ width: screenWidth * (320/360), height: 2, backgroundColor: '#E1E1E1' }}/>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: screenWidth * (315/360), paddingHorizontal: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 65, height: 25, backgroundColor: 'grey' }}/>
              <Text style={{ fontSize: 12 }}>
                QRIS Payment
              </Text>
            </View>
            <TouchableOpacity onPress={handlePress} style={{ width: 24, height: 24, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
            {isSelected ? (
                <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40' }} />
            ) : (
                <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' }} />
            )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ borderRadius: 16, width: screenWidth * (300/360), height: screenWidth * (56/360), backgroundColor: '#FF7D40', justifyContent: 'center', alignItems: 'center', marginTop: screenWidth * (70/360), marginBottom: 30 }}>
                <Text style={{color: '#FEFEFE', fontWeight: 'bold'}}>Rp{calculateTotalPrice(cartList).toLocaleString('en-US', { minimumFractionDigits: 2 })} - Pay</Text>
            </View>
          </TouchableOpacity>

        </View>
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
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    position : "relative"
  },

})