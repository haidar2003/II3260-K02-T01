import { StyleSheet, Text, View, Image} from 'react-native';
import {numberToRupiah} from "@/utils/formatting"

import React from 'react';

export default function Row_Comp({ name, rating, price}) {
  return (
    <View>
        <Image 
        style= {{width : 155, height : 155}} 
        source={require("@/assets/trainer_icon_placeholder.png")}/> 
        {/* Ganti ke URI */}
        <Text>
          { name }
        </Text>
        <Text>
         ⭐ { rating }  
        </Text>
        <Text>
          {/* emang kosong */}
        </Text>
        <Text>
         Rp { numberToRupiah(price) }/session
        </Text>
    </View>
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