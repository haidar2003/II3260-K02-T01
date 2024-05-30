import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import RowComp from '@/screen/find_trainer_component/row_comp';
import Filter from '@/screen/find_trainer_component/Filter';
import {numberToRupiah} from "@/utils/formatting"
import {Tag, Tag_status} from "@/utils/tag"
export default function Find_Trainer() {
  const referenceTags = [
    {id : 1, name : "Calisthenic"},
    {id : 2, name : "Yoga"},
    {id : 3, name : "Running"},
    {id : 4, name : "Jogging"},
    {id : 5, name : "Swimming"},
    {id : 6, name : "Upper Body"},
    {id : 7, name : "Lower Body"},
    {id : 8, name : "Full Body"},
    {id : 9, name : "Weight Training"},
    {id : 10, name : "Rucking"}
  ]
  const dataTags:Tag_status[] = referenceTags.map(item => ({
    ...item,
    active:false
  }))

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [tags, setTags] = useState<Tag_status[]>(dataTags); 
  const [location, setLocation] = useState<string>("");
  const [online, setOnline] = useState<boolean>(true);
  const [offline, setOffline] = useState<boolean>(true);
  const [stateScreen, setStateScreen] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  
  const toggleTags = (id : number) => {
    setTags((prevItems) => {
      return prevItems.map(item =>{
        if (item.id === id) {
          return {...item, active : !item.active}
        }
        return item
      })
    })
  }




  const dataTrainer = [
    {id : "1" , name : "Black Sheep", rating : 5 , pricee : 25500} ,
    {id : "2" , name : "White Sheep", rating : 4 , pricee : 20000} ,
    {id : "3" , name : "Red Sheep", rating : 3 , pricee : 100000} ,
    {id : "4" , name : "Blue Sheep", rating : 3 , pricee : 350000} ,
    {id : "5" , name : "Orange Sheep", rating : 3 , pricee : 350000} ,
    {id : "6" , name : "Pink Sheep", rating : 3 , pricee : 350000} 
  ]

  const renderTrainer = ({ item }) => (
    <View style = {{padding : 10}}>
      <RowComp name={item.name} rating={item.rating} price={item.pricee} />
    </View>
  );
  const renderTags = ({item}) => (
    <View style = {{flex : 3, backgroundColor : "#FFEAD9", borderRadius : 20, marginRight : 20, alignItems : "center",justifyContent : "center", padding : 5 }}>
      <Text style = {{fontSize : 12}}> {item.name} </Text>
    </View>
  )
  return (
    <View style={styles.layout}>
      {/* <View style={{position : "absolute", top : 0, left : 0}}> */}
        <View style = {styles.topBar}>
          {/* Yang atas */}
          <View style = {{flex : 1}}></View>
          <View style = {{flex : 4, alignItems : "center", justifyContent : "flex-start", marginTop : 5, flexDirection : "row"}}>  
            <View style={styles.searchBar}>  
              <Image source={require("@/assets/search.png")} style = {{margin : 5}}>
                {/* Icon Kaca Pembesar */}
              </Image>
              <TextInput>
                {/* Search Bar */}
              </TextInput>
            </View>
            <Image source={require("@/assets/shopping-cart.png")} style={{marginLeft : 10}} />
          </View>
        </View>
        <View style = {styles.filter_sort}>
          <View style = {{flex : 1, margin : 5, padding : 5, flexDirection : "row", alignItems : "center",justifyContent : "center" }}>
            <View style = {{flex : 3, backgroundColor : "#FFEAD9", borderRadius : 20, marginRight : 20, alignItems : "center",justifyContent : "center", padding : 5 }}>
              <Text style={{fontFamily : "System"}}> Rp{numberToRupiah(minPrice)} - Rp{numberToRupiah(maxPrice)} </Text>
            </View>
            <Pressable onPress = {() => setStateScreen(1)}>
            <Image source={require("@/assets/filter.png")} style={{marginHorizontal : 5}}></Image>
            </Pressable>
            <Image source={require("@/assets/sort.png")}  style={{marginHorizontal : 5}}></Image>
          </View>
          <FlatList 
            style = {{flex : 1}}
            data={tags.filter(item => item.active)}
            horizontal = {true}
            renderItem={renderTags}
            keyExtractor={(item) => item.id}/>
        </View>

        <View style = {{flex : 2, alignItems : "center", justifyContent : "center", marginTop : 10}}>
          <FlatList data={dataTrainer}
          renderItem={renderTrainer}
          keyExtractor={item => item.id}
          numColumns={2}
          style = {{maxWidth : "95%"}} />
        </View>
        {/* </View> */}
        { stateScreen === 1 &&( 
        <View style = {styles.grey}>
          <TouchableOpacity onPress={ () => setStateScreen(0)} disabled = {false} style={{flex : 1}}>
            <View style = {{flex : 1}}/>
          </TouchableOpacity>
        </View>)}

        { stateScreen === 1 &&(
        
          <Filter         minPrice={minPrice}
          maxPrice={maxPrice}
          tags={tags}
          location={location}
          online={online}
          offline={offline}
          rating={rating}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setTags={setTags}
          setLocation={setLocation}
          setOnline={setOnline}
          setOffline={setOffline}
          setRating={setRating}
          toggleTags={toggleTags}>
      
          </Filter>
        )} 
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
    width : "80%",
    height : "50%",
    maxHeight : 40,
    padding : 5
  },
  layout: {
    flex: 1,
    // flexDirection: 'row',
    width: Dimensions.get("window").width , //for full screen
    height: Dimensions.get("window").height, //for full screen
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position : "relative"
  },
  topBar :{
    flex: 1,
    maxHeight : 100,
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