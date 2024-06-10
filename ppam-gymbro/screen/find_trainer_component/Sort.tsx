import { StyleSheet, Text, View, Image, Pressable, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {numberToRupiah, numberInput, floatInput} from "@/utils/formatting"
import {Tag, Tag_status} from "@/utils/tag"
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
interface SortProps {
  sortPrice: number,
  sortRating: number,
  sortName: number,
  setSortPrice: React.Dispatch<React.SetStateAction<number>>,
  setSortRating: React.Dispatch<React.SetStateAction<number>>,
  setSortName: React.Dispatch<React.SetStateAction<number>>
}

const screenWidth = Dimensions.get('window').width;

// export default function Sort({ minPrice , setMinPrice, maxPrice , setMaxPrice, tags, setTags, online, setOnline , offline, setOffline}) {
  const  Sort : React.FC<SortProps> = ({
    sortPrice,
    setSortPrice,
    sortRating,
    setSortRating,
    sortName,
    setSortName
  }) => {

    const[sortPriceTemp, setSortPriceTemp] = useState(sortPrice)
    const[sortRatingTemp, setSortRatingTemp] = useState(sortRating)
    const[sortNameTemp, setSortNameTemp] = useState(sortName)

    const handlePricePress = (val) => {
        console.log('test');
        setSortPriceTemp(val);
        setSortPrice(val);
    };

    const handleRatingPress = (val) => {
        console.log('test');
        setSortRatingTemp(val);
        setSortRating(val);
    };

    const handleNamePress = (val) => {
        console.log('test');
        setSortNameTemp(val);
        setSortName(val);
    };

  return (
    <View style = {styles.layout}>
      <View style={{ marginBottom: 20 }}>
        <Text style = {{fontSize : 24, color : "black", fontWeight : "bold" }}>Sort By</Text>
      </View>
      
      <View style={{width: '100%', marginBottom: 20, gap: 15}}>
        <Text style = {styles.subTitle}> Price </Text>
        <View style = {{ flexDirection : "row", alignItems : "center", justifyContent: 'flex-start', gap: 40}}>
            <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15}}>
                <TouchableOpacity onPress={() => handlePricePress(1)} style={{ width: 24, height: 24, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                    {sortPriceTemp === 1 ? (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40' }} />
                    ) : (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' }} />
                    )}
                </TouchableOpacity>
                <Text style={{ fontSize: 14 }}>
                    Ascending
                </Text>
            </View>
            <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15}}>
                <TouchableOpacity onPress={() => handlePricePress(2)} style={{ width: 24, height: 24, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                    {sortPriceTemp === 2 ? (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40' }} />
                    ) : (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' }} />
                    )}
                </TouchableOpacity>
                <Text style={{ fontSize: 14 }}>
                    Descending
                </Text>
            </View>
        </View>
      </View>

      <View style={{width: '100%', marginBottom: 20, gap: 15}}>
        <Text style = {styles.subTitle}> Rating </Text>
        <View style = {{ flexDirection : "row", alignItems : "center", justifyContent: 'flex-start', gap: 40}}>
            <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15}}>
                <TouchableOpacity onPress={() => handleRatingPress(1)} style={{ width: 24, height: 24, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                    {sortRatingTemp === 1 ? (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40' }} />
                    ) : (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' }} />
                    )}
                </TouchableOpacity>
                <Text style={{ fontSize: 14 }}>
                    Ascending
                </Text>
            </View>
            <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15}}>
                <TouchableOpacity onPress={() => handleRatingPress(2)} style={{ width: 24, height: 24, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                    {sortRatingTemp === 2 ? (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40' }} />
                    ) : (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' }} />
                    )}
                </TouchableOpacity>
                <Text style={{ fontSize: 14 }}>
                    Descending
                </Text>
            </View>
        </View>
      </View>

      <View style={{width: '100%', marginBottom: 20, gap: 15}}>
        <Text style = {styles.subTitle}> Trainer Name </Text>
        <View style = {{ flexDirection : "row", alignItems : "center", justifyContent: 'flex-start', gap: 40}}>
            <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15}}>
                <TouchableOpacity onPress={() => handleNamePress(1)} style={{ width: 24, height: 24, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                    {sortNameTemp === 1 ? (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40' }} />
                    ) : (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' }} />
                    )}
                </TouchableOpacity>
                <Text style={{ fontSize: 14 }}>
                    Ascending
                </Text>
            </View>
            <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15}}>
                <TouchableOpacity onPress={() => handleNamePress(2)} style={{ width: 24, height: 24, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                    {sortNameTemp === 2 ? (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40' }} />
                    ) : (
                        <View style={{ width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#FF7D40' }} />
                    )}
                </TouchableOpacity>
                <Text style={{ fontSize: 14 }}>
                    Descending
                </Text>
            </View>
        </View>
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

export default Sort;