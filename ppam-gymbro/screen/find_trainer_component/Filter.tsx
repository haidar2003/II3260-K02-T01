import { StyleSheet, Text, View, Image} from 'react-native';
import {numberToRupiah} from "@/utils/formatting"

import React from 'react';

export default function Row_Comp({ minPrice , setMinPrice, maxPrice , setMaxPrice, tags, setTags, online, setOnline , offline, setOffline}) {
  return (
    <View style = {styles.layout}>
        <Text style = {{fontSize : 24, color : "black", fontWeight : "800" }}>Trainer Filter</Text>
        <Text style = {styles.subTitle}> Price </Text>
        <View>
          {/* Input Price Range */}
        </View>
        <Text style = {styles.subTitle}></Text>
        <View>
          {/* Training Type */}
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  layout : {
    backgroundColor : "white",
    borderTopRightRadius : 20,
    borderTopLeftRadius : 20,
    width : "100%",
    alignItems : "flex-start",
    justifyContent : "flex-start"
  } , 
  subTitle : {
    fontSize : 16,
    fontWeight : "700",
    color : "black"

  },
  subContainer : {
    
  }
})