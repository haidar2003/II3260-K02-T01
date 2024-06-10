import { StyleSheet, Text, View, Image, Pressable, FlatList, Dimensions} from 'react-native';
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

const screenWidth = Dimensions.get('window').width;

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
      <View style={{ marginBottom: 20 }}>
        <Text style = {{fontSize : 24, color : "black", fontWeight : "bold" }}>Trainer Filter</Text>
      </View>
      
      <View style={{width: '100%', marginBottom: 15}}>
        <Text style = {styles.subTitle}> Price </Text>
        <View style = {{ flexDirection : "row", alignItems : "center", justifyContent: 'space-between'}}>
          <View style = {[styles.item, { width: screenWidth * (145/360) }]}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Rp</Text>
            <TextInput style ={{height : 35, fontSize: 12, width : "100%", backgroundColor : "transparent", borderWidth : 0}} 
              value={minPriceDisplay} 
              keyboardType="numeric"
              underlineColor='transparent' 
              onChangeText={(v) => {setMinPriceTemp(numberInput(v)) ; setMinPriceDisplay(v)}}
              onFocus={() => {setMinPriceDisplay("")}}
              onBlur={() => {setMinPriceTemp(minPrice) ;  setMinPriceDisplay(numberToRupiah(minPrice))}}
              onSubmitEditing={(event) => { 

                {if (minPriceTemp > maxPrice) { 
                setMinPrice(maxPrice) ;
                 setMinPriceDisplay( numberToRupiah(minPrice)) }
                  else  { setMinPrice((minPriceTemp)) ; 
                  setMinPriceDisplay( numberToRupiah(minPriceTemp))}} }}
              
              >

            </TextInput >
          </View>
          <View style = {[styles.item, { width: screenWidth * (145/360) }]}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Rp</Text>
          <TextInput style ={{height : 35, fontSize: 12,  width : "100%", backgroundColor : "transparent", borderWidth : 0}}
              underlineColor='transparent' 
              value={maxPriceDisplay} 
              keyboardType="numeric"
              onChangeText={(v) => {setMaxPriceTemp(numberInput(v)) ; setMaxPriceDisplay(v)}}
              onFocus={() => {setMaxPriceDisplay("")}}
              onBlur={() => {setMaxPriceTemp(maxPrice); setMaxPriceDisplay( numberToRupiah(maxPrice))}}
              onSubmitEditing={(event) => { 


                if (maxPriceTemp < minPrice) { 
                setMaxPrice(minPrice) ;
                 setMaxPriceDisplay( numberToRupiah(minPrice)) }
                  else  { setMaxPrice((maxPriceTemp)) ; 
                  setMaxPriceDisplay( numberToRupiah(maxPriceTemp))} }}
              >

            </TextInput >
          </View>
        </View>
      </View>
        
      <View style={{width: '100%', marginBottom: 15}}>
        <Text style = {styles.subTitle}> Rating </Text>
        <View style = {{flexDirection : "row", alignItems : "flex-start"}}>
          <View style = {[styles.item, { width: screenWidth * (98/360) }]}>
            <Image style= {{width : screenWidth * (15/360), height : screenWidth * (15/360), }} source={require("@/assets/icons/star_unfilled.png")}/> 
            <TextInput style ={{height : 35, fontSize:12, width : "100%", backgroundColor : "transparent", borderWidth : 0}} 
              value={ratingDisplay} 
              underlineColor='transparent' 
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
      </View>

      <View style={{width: '100%', marginBottom: 15}}>
      <Text style = {styles.subTitle}> Location </Text>
        <View style = {{flexDirection : "row", alignItems : "flex-start"}}>
          <View style = {[styles.item, { width: screenWidth * (180/360) }]}>
          <Image style= {{width : screenWidth * (15/360), height : screenWidth * (15/360), }} source={require("@/assets/icons/location.png")}/> 
          <TextInput style ={{height : 30, width : "100%", backgroundColor : "transparent", borderWidth : 0}} 
              value={locationTemp} 
              underlineColor='transparent' 
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
    borderTopRightRadius : 32,
    borderTopLeftRadius : 32,
    width : "100%",
    alignItems : "flex-start",
    justifyContent : "flex-start",
    height : "80%",
    zIndex : 2,
    paddingHorizontal : 25,
    paddingTop : 40
  } , 
  subTitle : {
    fontSize : 16,
    fontWeight : "bold",
    color : "#44444"

  },
  item : {
    borderRadius : 16,
    margin : 5,
    padding : 5,
    borderColor : "#8F8F8F",
    borderWidth : 1,
    height : screenWidth * (38/360),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 15
  }
})

export default Filter;