import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {numberToRupiah} from "@/utils/formatting"

import React from 'react';
import { router } from 'expo-router';

const screenWidth = Dimensions.get('window').width;


export default function Row_Comp({id ,name, rating, price}) {
  return (
    <TouchableOpacity onPress={ () => {console.log(("/(tabs)/find_Trainer/trainer_profile/"+id));router.navigate("/(tabs)/find_Trainer/trainer_profile/"+id)}}>
    <View style={{ width : screenWidth * (155/360), height : screenWidth * (250/360), borderRadius: 8, backgroundColor: 'grey' }}>
        <Image 
        style= {{width : screenWidth * (155/360), height : screenWidth * (155/360), borderTopRightRadius : 8, borderTopLeftRadius : 8}} 
        source={require("@/assets/trainer_icon_placeholder.png")}/> 

        <View style = {{paddingVertical : 5, paddingHorizontal: 10, justifyContent: 'flex-start', gap: screenWidth * (25/360) }}>
          
          <View style={{ gap: 3 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#444444' }}>
              { name }
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 10 }}>
              <View style={{ width: 12, height: 12, backgroundColor: 'black' }}/>
              {rating !== null && (
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#444444' }}>
              { rating }  
              </Text>)}
            </View>
          </View>
          
  
          { price != null && (<Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#444444' }}>
              Rp{ numberToRupiah(price) }
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#444444' }}>
              /session
            </Text> 
          </Text>)}
        </View>
    </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container : {
    flex : 1,
    maxWidth : "50%",
    padding : 5,
    paddingTop : 5
  },
  trainer_name: {
    fontSize : 14,
    fontWeight : "700",
    color: "black",
    textAlign: "left"
  },
  rating: {
    fontSize : 12,
    fontWeight : "700",
    color: "black",
    textAlign: "left"
  },
  price : {
    fontSize : 12,
    fontWeight : "700",
    color: "black",
    textAlign: "left"
  }
})