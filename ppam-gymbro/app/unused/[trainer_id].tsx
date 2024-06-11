import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import { SearchTrainerElement } from '@/utils/searchTrainerElement';
import ReserveTrainerPlan from '@/screen/find_trainer_component/ReserveTrainerPlan';
import { Link, router, useLocalSearchParams } from 'expo-router';
import ReserveTrainerInvoice from '@/screen/find_trainer_component/ReserveTrainerInvoice';
import { useAuth } from '@/provider/AuthProvider';
import { useCart } from '@/provider/CartProvider';
import CryptoJS from 'crypto-js';
import { supabase } from '@/utils/supabase';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
const screenWidth = Dimensions.get('window').width;

export default function PastInvoice() {
  const currentUserId = 1;
  const {session,authLoading,userData,getSession,updateUserData} = useAuth()
  
  const [loading, setLoading] = useState(false)
  
  const today = new Date();
  // const {cartList, addToCart, removeFromCart} = useCart()
  const {trainer_id} = useLocalSearchParams()
  
  const [invoice, setInvoice] = useState(null)
  
  const fetchData = async () => {
    setLoading(true)
    console.log(trainer_id)
    const {data, error} = await supabase.from("Transaction").select("*").eq("id_trainer", trainer_id)
    if (error) {
      console.log("failed to fetch invoice", error)
    } else {
      console.log("Hallooooo",data)
      if (data.length < 1) {
        console.log("KOSONG")
      }
      setInvoice(data[0])
    }
    setLoading(false)
  }

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

  
  
  useEffect(() => {fetchData(); console.log(invoice); console.log("ASFHKFSHFJE",trainer_id)}, [])

  const renderCart = ({item}) => {
    return (
      <View style={{ marginVertical: screenWidth * (10/360) }}>
        <ReserveTrainerInvoice 
          trainerName={item.trainer_name}
          onlineBundle={item.onlin_bundle}
          offlineBundle={item.offline_bundle}
          onlineUnitPrice={item.online_unit_price}
          offlineUnitPrice={item.offline_unit_price}
        />
      </View>
    )
  }
  if (loading || invoice == null) {

    setTimeout(()=>{router.replace("/home")}, 15000)
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
                GB-PPAM{invoice.transaction_code}
              </Text>
              <Text>
                Rp{invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
              <Text>
                {userData.username}
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                Paid
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
              data={ [{trainerName : invoice.trainer_name, onlineBundle : invoice.online_bundle, onlineUnitPrice : invoice.online_pnit_price,
                offlineBundle : invoice.offline_bundle, offlineUnitPrice : invoice.offline_pnit_price 
              }] }
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
            
            <View style={{ width: 250, height: 250, backgroundColor: '#444444' }}/>
            
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