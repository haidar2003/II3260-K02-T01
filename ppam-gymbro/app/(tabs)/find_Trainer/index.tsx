import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import RowComp from '@/screen/find_trainer_component/row_comp';
import Filter from '@/screen/find_trainer_component/Filter';
import {numberToRupiah} from "@/utils/formatting"
import {Tag, Tag_status} from "@/utils/tag"
import { Link } from 'expo-router';
import Sort from '@/screen/find_trainer_component/Sort';
// import Fuse from 'fuse.js';
const screenWidth = Dimensions.get('window').width;

import LoadingScreen from '@/screen/loading_screen/loadingScreen';
import { supabase } from '@/utils/supabase';
import filter from "lodash.filter"

export default function Find_Trainer() {
  const [isloading, setLoading] = useState(true)
  const [referenceTags, setReferenceTags] = useState([])
  const [dataTrainer, setDataTrainer] = useState([])
  const [dataTrainerWithPrice, setDataTrainerWithPrice] = useState([])
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [tags, setTags] = useState<Tag_status[]>([]); 
  const [location, setLocation] = useState<string>("");
  const [online, setOnline] = useState<boolean>(true);
  const [offline, setOffline] = useState<boolean>(true);
  const [stateScreen, setStateScreen] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [query, setQuery] = useState("")

  const [sortPrice, setSortPrice] = useState(0)
  const [sortRating, setSortRating] = useState(0)
  const [sortName, setSortName] = useState(0)

  const [search, setSearch] = useState("")

  const fetchInitialData = async () => {
    try {
      const {data: fetchTagData, error : errorTag} = await supabase.from("Tag").select("*");
      const {data : fetchTrainerData, error :  errorTrainer} = await supabase.rpc('get_trainer_details')
      if (errorTag){
          console.error("error, fetching tag", errorTag)
        } else {
          setReferenceTags(fetchTagData)
          setDataTrainer(fetchTrainerData)


       }
     }   finally { 
        setLoading(false)
        const dataTags:Tag_status[] = referenceTags.map(item => ({
          ...item,
          active:false
        }))
        setTags(dataTags)
    }
  }

  useEffect(() => {  }, [dataTrainer])
  useEffect( () => {fetchInitialData(); console.log("Fuse")}, [])

  const searchTrainer = async () => {
    setLoading(true)
    let location_con 
    if (location == "") {
      location_con = '%'
    }
    const max_price_con = maxPrice
    const min_price_con = minPrice
    const min_rating = rating
    const{data : fetchTrainerData, error : errorTrainer} = await supabase
    .rpc('search_trainer', { 
      max_price_con, 
      min_price_con, 
      min_rating, 
    })
    if (errorTrainer) {
      console.log("Search fail", errorTrainer)
      setLoading(false)
    } else {
      const formattedQuery = search.toLowerCase()
      const formattedLoc = location.toLowerCase()
      const filteredData = filter(fetchTrainerData,(item)  => ((item.nama_trainer.toLowerCase().includes(formattedQuery)  
      || item.description.includes(formattedQuery) || item.username.includes(formattedQuery)  && (item.location.toLowerCase().includes(formattedLoc))
    )) )
      // console.log("YOOOOOOOOOOO",query)
      // console.log(filteredData)
      setDataTrainer(filteredData)
      setLoading(false) 
    }
  }

  if (isloading) {
    return <LoadingScreen/>
  }

  
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

  const renderTrainer = ({ item }) => (
    <View style = {{ marginHorizontal: 5, marginVertical: 7.5}}>
      <RowComp id = {item.trainer_id} name={item.nama_trainer} rating={( item.average_star? item.average_star.toFixed(1) : null)} price={item.min_price} />
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
              <Image source={require("@/assets/icons/search.png")} style = {{height: 25, width: 25,margin : 5}} />
              <TextInput
                    style={{ width: screenWidth * (200 / 360), height: screenWidth * (38 / 360) }}
                    value={search}
                    onChangeText={setSearch}
                    onBlur={() => searchTrainer()}
                    keyboardType="default"
                    placeholder='Search Trainer'
                />
            </View>
            <Image source={require("@/assets/icons/cart.png")} style={{height: 25, width: 25,marginLeft : 10}} />
          </View>
        </View>

        <View style = {styles.filter_sort}>
          <View style = {{flex : 1, margin : 5, padding : 5, flexDirection : "row", alignItems : "center",justifyContent : "center" }}>
            <View style = {{height: screenWidth * (32/360), width: screenWidth * (220/360), backgroundColor : "#FFEAD9", borderRadius : 20, marginRight : 20, alignItems : "center",justifyContent : "center", padding : 5 }}>
              <Text style={{fontFamily : "System", color: '#444444', fontSize: 12, fontWeight: 'bold'}}> Rp{numberToRupiah(minPrice)} - Rp{numberToRupiah(maxPrice)} </Text>
            </View>
            <Pressable onPress = {() => setStateScreen(1)}>
              <View style={{ height: screenWidth * (32/360), width: screenWidth * (40/360), marginHorizontal : 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF7D40', borderRadius: 12 }}>
                <Image source={require("@/assets/icons/filter.png")} style={{width: 20, height: 20 }} />
              </View>
            </Pressable>
            <Pressable onPress = {() => setStateScreen(2)}>
              <View style={{ height: screenWidth * (32/360), width: screenWidth * (40/360), marginHorizontal : 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF7D40', borderRadius: 12 }}>
                  <Image source={require("@/assets/icons/sort.png")} style={{width: 20, height: 20 }} />
              </View>
            </Pressable>
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

        { stateScreen === 1 && ( 
        <View style = {styles.grey}>
          <TouchableOpacity onPress={ () => {setStateScreen(0) ; searchTrainer()}} disabled = {false} style={{flex : 1}}>
            <View style = {{flex : 1}}/>
          </TouchableOpacity>
        </View>)}

        { stateScreen === 1 && (
        
          <Filter         
            minPrice={minPrice}
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
            toggleTags={toggleTags}
          />

        )} 

        { stateScreen === 2 && ( 
        <View style = {styles.grey}>
          <TouchableOpacity onPress={ () => {setStateScreen(0); searchTrainer()}} disabled = {false} style={{flex : 1}}>
            <View style = {{flex : 1}}/>
          </TouchableOpacity>
        </View>)}

        { stateScreen === 2 && (
        
          <Sort         
            sortPrice={sortPrice}
            sortRating={sortRating}
            sortName={sortName}
            setSortPrice={setSortPrice}
            setSortRating={setSortRating}
            setSortName={setSortName}
          />

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
    borderRadius : 16,
    width : screenWidth * (270/360),
    height : screenWidth * (38/360),
    maxHeight : 40,
    paddingHorizontal: 10,
    gap: 5,
    borderWidth: 2,
    borderColor: '#EEEEEE'
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