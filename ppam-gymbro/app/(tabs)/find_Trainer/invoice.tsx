import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import { SearchTrainerElement } from '@/utils/searchTrainerElement';
import ReserveTrainerPlan from '@/screen/find_trainer_component/ReserveTrainerPlan';
import { Link } from 'expo-router';
import ReserveTrainerInvoice from '@/screen/find_trainer_component/ReserveTrainerInvoice';
import { useAuth } from '@/provider/AuthProvider';
import { useCart } from '@/provider/CartProvider';
import CryptoJS from 'crypto-js';
import { supabase } from '@/utils/supabase';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
const screenWidth = Dimensions.get('window').width;

export default function Invoice() {
  const currentUserId = 1;
  const {session,authLoading,userData,getSession,updateUserData} = useAuth()
  
  const [loading, setLoading] = useState(false)
  
  const today = new Date();
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

  // const [cart, setCart] = useState(userCart)
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

  
  
  const resultHash = CryptoJS.SHA256(userData.username + new Date() + calculateTotalPrice(cartList)).toString(CryptoJS.enc.Hex).toUpperCase()
  let currentUserInvoice 
  if (resultHash.length < 9) {
    currentUserInvoice = resultHash.padEnd(9,'0')
  } else {
    currentUserInvoice = resultHash.slice(0,9)
  }

  const handleBuy = async () => {
    setLoading(true)
     cartList.forEach( async (cart) => {
      for (let i = 0; i < cart.offlineBundle; i++) {
        const {data, error} = await supabase.from("Session").insert([{
          type : "Offline", id_user : userData.id_user, id_trainer : cart.trainerId
        }])

        if (error) {
          console.log(error)
        }
      }
      for (let i = 0; i < cart.onlineBundle; i++) {
        const {data, error} = await supabase.from("Session").insert([{
          type : "Online", id_user : userData.id_user, id_trainer : cart.trainerId
        }])

        if (error) {
          console.log("insert session failed",error)
          break
        }
      }
      const {data : data4, error : error4} = await supabase.from("Transaction").insert([{
        id_user : userData.id_user, id_trainer : cart.trainerId, amount : calculateTotalPrice([cart])
      }])

      const {data : data2 , error : error2}  = await supabase.from("Chat").select("*").eq("id_user", userData.id_user).eq("id_trainer", cart.trainerId)
      if (error2) {
        console.log(error2)
      } else if (data2.length <= 0) {
        const {data : data3, error : error3} = await supabase.from("Chat").insert([{
          id_user : userData.id_user, id_trainer : cart.trainerId
        }]).single()
        if (error3) {
          console.log("insert chat fail", error3)
        } else if (data3 != null) {
          // const {data : data4, error : error4} = await supabase.from("Message").insert([{
          //   id_chat : data3.id_chat, messageType : "Trainer", content : "Halo, terimakasih telah memesan"
          // }])
        }
      }
    });
    setLoading(false)
    
  }
  // console.log(resultHash)
  // useEffect(() => {console.log("AAAAAAAAAA",cartList)}, [])

  const renderCart = ({item}) => {
    return (
      <View style={{ marginVertical: screenWidth * (10/360) }}>
        <ReserveTrainerInvoice 
          trainerName={item.trainerName}
          onlineBundle={item.onlineBundle}
          offlineBundle={item.offlineBundle}
          onlineUnitPrice={item.onlineUnitPrice}
          offlineUnitPrice={item.offlineUnitPrice}
        />
      </View>
    )
  }
  if (loading) {
    return <LoadingScreen/>
  }

  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (25/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
              Invoice
            </Text>
          </View>
          <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360)}} />
        </View>

        <View style={{alignItems: 'center'}}>
          <View style={{ width: 110, height: 110, backgroundColor: '#FF7D40', marginVertical: 10 }}/>
          <View style={{ width: screenWidth * (270/360), flexDirection: 'row', gap: 50, marginVertical: 30 }}>
            <View style={{ gap: 15 }}>  
              <Text style={{ fontWeight: 'bold' }}>
                Order ID
              </Text>
              <Text>
                Total
              </Text>
              <Text>
                Username
              </Text>
              <Text>
                Status
              </Text>
            </View>
            <View style={{ gap: 15 }}>
              <Text style={{ fontWeight: 'bold' }}>
                GB-PPAM{currentUserInvoice}
              </Text>
              <Text>
                Rp{calculateTotalPrice(cartList).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
              <Text>
                {userData.username}
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                Unpaid
              </Text>
            </View>
          </View>

          <View style = {{ flex : 1,  marginBottom: screenWidth * (10/360), paddingHorizontal: 20, flexDirection : "column", justifyContent : "center", alignItems :"flex-start"}} >
            <View style={{ paddingHorizontal: 5, alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 10 }}>
              <Text style = {{fontSize : 20, fontWeight : "bold", color: '#444444' }}>All Order</Text>
            </View>
            <View style={{ width: screenWidth * (320/360), height: 2, backgroundColor: '#E1E1E1' }}/>
          </View>

          <ScrollView horizontal = {true}>
            <FlatList
              data={cartList}
              renderItem={renderCart}
              keyExtractor={item => item.id}
            />
          </ScrollView>

          <View style = {{ flex : 1,  marginBottom: screenWidth * (10/360), paddingHorizontal: 20, flexDirection : "column", justifyContent : "center", alignItems :"flex-start", marginTop: screenWidth * (10/360) }} >
            <View style={{ paddingHorizontal: 5, alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 10 }}>
              <Text style = {{fontSize : 20, fontWeight : "bold", color: '#444444' }}>Payment Options</Text>
            </View>
            <View style={{ width: screenWidth * (320/360), height: 2, backgroundColor: '#E1E1E1' }}/>
          </View>

          <View style={{ alignItems: 'center', gap: 20, marginTop: 20, marginBottom: 80 }}>
            <TouchableOpacity onPress={()=>{handleBuy()}}>
            <View style={{ width: 250, height: 250, backgroundColor: '#444444' }}/>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', gap: 5  }}>
              <Text style={{ fontWeight: 'bold' }}>
                Available Until
              </Text>
              <Text>
                {today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()}
              </Text>
            </View>
            
          </View>


        </View>
      </ScrollView>   
    </View>

  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    // flexDirection: 'row',
    width: screenWidth , //for full screen
    height: Dimensions.get("window").height, //for full screen
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    position : "relative"
  },
})