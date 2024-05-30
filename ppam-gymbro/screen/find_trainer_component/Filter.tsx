import { StyleSheet, Text, View, Image, Pressable, FlatList} from 'react-native';
import {numberToRupiah, numberInput, floatInput} from "@/utils/formatting"
import {Tag, Tag_status} from "@/utils/tag"
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
interface FilterProps {
  minPrice: number;
  maxPrice: number;
  tags: Tag_status[];
  location: string;
  online: boolean;
  offline: boolean;
  rating: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  setTags: React.Dispatch<React.SetStateAction<Tag_status[]>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setOnline: React.Dispatch<React.SetStateAction<boolean>>;
  setOffline: React.Dispatch<React.SetStateAction<boolean>>;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  toggleTags : (id: number) => void;
}
// export default function Filter({ minPrice , setMinPrice, maxPrice , setMaxPrice, tags, setTags, online, setOnline , offline, setOffline}) {
  const  Filter : React.FC<FilterProps> = ({
    minPrice,
    maxPrice,
    tags,
    location,
    online,
    offline,
    rating,
    setMinPrice,
    setMaxPrice,
    setTags,
    setLocation,
    setOnline,
    setOffline,
    setRating,
    toggleTags
  }) => {

  const [minPriceTemp, setMinPriceTemp] = useState(minPrice)    
  const [maxPriceTemp, setMaxPriceTemp] = useState(maxPrice)
  const [minPriceDisplay, setMinPriceDisplay] = useState("Rp " + numberToRupiah(minPrice))    
  const [maxPriceDisplay, setMaxPriceDisplay] = useState("Rp " + numberToRupiah(maxPrice))
  const [ratingTemp, setRatingTemp] = useState(rating)
  const [ratingDisplay, setRatingDisplay] = useState(rating.toString())
  const [locationTemp, setLocationTemp ] = useState(location)

  const renderTags = ({item}) => (
    
    <Pressable style = { {flex : 3, backgroundColor : item.active ? "#FFEAD9" : "#fefefe", borderRadius : 20, marginRight : 20, alignItems : "center",justifyContent : "center", padding : 5, marginTop : 5, borderWidth : 2, borderColor : "#FFEAD9" }}
      onPress={() => toggleTags(item.id)}>
      <Text style = {{fontSize : 12}}> {item.name} </Text>
    </Pressable>
  )
  return (
    <View style = {styles.layout}>
        <Text style = {{fontSize : 24, color : "black", fontWeight : "800" }}>Trainer Filter</Text>
        <Text style = {styles.subTitle}> Price </Text>
        <View style = {{flex : 1, flexDirection : "row", alignItems : "flex-start"}}>
          <View style = {styles.item}>
            <TextInput style ={{height : 30, width : "100%", backgroundColor : "transparent", borderWidth : 0}} 
              value={minPriceDisplay} 
              keyboardType="numeric"
              onChangeText={(v) => {setMinPriceTemp(numberInput(v)) ; setMinPriceDisplay(v)}}
              onFocus={() => {setMinPriceDisplay("")}}
              onBlur={() => {setMinPriceTemp(minPrice) ;  setMinPriceDisplay( "Rp " + numberToRupiah(minPrice))}}
              onSubmitEditing={(event) => { 

                {if (minPriceTemp > maxPrice) { 
                setMinPrice(maxPrice) ;
                 setMinPriceDisplay("Rp " + numberToRupiah(minPrice)) }
                  else  { setMinPrice((minPriceTemp)) ; 
                  setMinPriceDisplay("Rp " + numberToRupiah(minPriceTemp))}} }}
              >

            </TextInput >
          </View>
          <View style = {styles.item}>
          <TextInput style ={{height : 30, width : "100%", backgroundColor : "transparent", borderWidth : 0}} 
              value={maxPriceDisplay} 
              keyboardType="numeric"
              onChangeText={(v) => {setMaxPriceTemp(numberInput(v)) ; setMaxPriceDisplay(v)}}
              onFocus={() => {setMaxPriceDisplay("")}}
              onBlur={() => {setMaxPriceTemp(maxPrice); setMaxPriceDisplay( "Rp " + numberToRupiah(maxPrice))}}
              onSubmitEditing={(event) => { 


                if (maxPriceTemp < minPrice) { 
                setMaxPrice(minPrice) ;
                 setMaxPriceDisplay("Rp " + numberToRupiah(minPrice)) }
                  else  { setMaxPrice((maxPriceTemp)) ; 
                  setMaxPriceDisplay("Rp " + numberToRupiah(maxPriceTemp))} }}
              >

            </TextInput >
          </View>
        </View>
        <Text style = {styles.subTitle}> Rating </Text>
        <View style = {{flex : 1, flexDirection : "row", alignItems : "flex-start"}}>
          <View style = {styles.item}>
            <TextInput style ={{height : 30, width : "100%", backgroundColor : "transparent", borderWidth : 0}} 
              value={ratingDisplay} 
              keyboardType="numeric"
              onChangeText={(v) => {setRatingTemp(floatInput(v)) ; setRatingDisplay(v)}}
              onFocus={() => {setRatingTemp(0) ; setRatingDisplay("")}}
              onBlur={() => {setRatingTemp(rating) ; setRatingDisplay(rating.toString())}}
              onSubmitEditing={(event) => { 
                if (ratingTemp > 5){
                  setRating(5)
                  setRatingTemp(5)
                } else {
                  setRating(ratingTemp)
                }
              }}
              >

            </TextInput >
          </View>
        </View>
        <Text style = {styles.subTitle}> Location </Text>
        <View style = {{flex : 1, flexDirection : "row", alignItems : "flex-start"}}>
          <View style = {styles.item}>
          <TextInput style ={{height : 30, width : "100%", backgroundColor : "transparent", borderWidth : 0}} 
              value={locationTemp} 
              keyboardType="default"
              onChangeText={(v) => {setLocationTemp((v))}}
              onFocus={() => {setLocationTemp("")}}
              onBlur={() => {setLocationTemp(location)}}
              onSubmitEditing={(event) => { 
                setLocation(locationTemp)
              }}
              >

            </TextInput >

          </View>
        </View>
        <Text style = {styles.subTitle}> Workout Type </Text>
        <View style = {{flex : 3, alignItems : "center" , width : "100%"}}>
          <FlatList 
            style = {{flex : 1, width : "100%"}}
            data={tags}
            numColumns={3}
            renderItem={renderTags}
            keyExtractor={(item) => item.id}/>
            
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
    justifyContent : "flex-start",
    height : "80%",
    zIndex : 2,
    padding : 10,
    paddingTop : 20
  } , 
  subTitle : {
    fontSize : 16,
    fontWeight : "700",
    color : "black",
    flex : 0.5

  },
  item : {
    flex : 1,
    borderRadius : 50,
    margin : 5,
    padding : 5,
    borderColor : "black",
    borderWidth : 2,
    height : "50%"
  }
})

export default Filter;