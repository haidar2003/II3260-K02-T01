
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link, router, useGlobalSearchParams, useLocalSearchParams, usePathname } from 'expo-router';
import Excercise from '@/screen/workout_component/Excercise';
import UserReview from '@/screen/find_trainer_component/UserReview';
import TrainerPlan from '@/screen/find_trainer_component/TrainerPlan';
import TrainerProfile from '@/screen/find_trainer_component/TrainerProfile';
import { supabase } from '@/utils/supabase';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';

const screenWidth = Dimensions.get('window').width;

export default function trainerProfile() {
    const {trainer_id} = useLocalSearchParams();
    const pathname = usePathname();
    const [trainerData, setTrainerData] = useState(null)
    const [currentScreen, setCurrentScreen] = useState('Details');
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [loading4, setLoading4] = useState(false)
    const [reviewData, setReviewData] = useState(null)
    const [pricingData, setPricingwData] = useState(null)
    const [tagData, setTagData] = useState(null)
    const handleScreenChange = (screen) => {
      setCurrentScreen(screen);
    };
    const getTrainerData = async () => {
      setLoading1(true)
      // console.log(trainer_id)
      const {data, error} = await supabase.from("Trainer").select("*").eq("trainer_id", trainer_id).single()
      if (error) {
        console.log("get trainer data failed",trainer_id,error)
        setLoading1(false)
      } else {
        // console.log("Get TRAINER DATA",data)
        setTrainerData(data)
        setLoading1(false)
      }
      
    }

    const getReviewData = async () => {
      setLoading2(true)
      const {data, error} = await supabase.from("Review").select("*").eq("trainer_id", trainer_id)
      if (error) {
        console.log("get review data failed",trainer_id,error)
      } else {
        setReviewData(data)
      }
      setLoading2(false)
    }
    const getPricingData = async () => {
      setLoading3(true)
      const {data, error} = await supabase.from("Pricing_Plan").select("*").eq("trainer_id", trainer_id)
      if (error) {
        console.log("get pricing data failed",trainer_id,error)
      } else {
        setPricingwData(data)
      }
      setLoading3(false)
    }

    const getTagData = async () => {
      setLoading4(true)
      const {data, error} = await supabase.from("Pricing_Plan").select("*").eq("trainer_id", trainer_id)
      if (error) {
        console.log("get pricing data failed",trainer_id,error)
      } else {
        setPricingwData(data)
      }
      setLoading4(false)
    }



    const trainer = {
      trainerId: 1,
      trainerName: 'Radityta Azka',
      trainerUsername: 'iyaq',
      trainerRating: 4,
      trainerCity: 'Bandung',
      trainerReview: [
        { reviewId: 1, userFullName: 'Rafi Haidar', rating: 4, review: 'Lorem Ipsum Dolor Sit Amet Wakakakakakkakakakakak' },
        { reviewId: 2, userFullName: 'Kean Santang', rating: 4, review: 'Lorem Ipsum Dolor Sit Amet Wakakakakakkakakakakak' },
        { reviewId: 3, userFullName: 'X', rating: 4, review: 'Lorem Ipsum Dolor Sit Amet Wakakakakakkakakakakak' },
      ],
      trainerPlan: [
        { planId: 1, planType: 'Online', planUnitPrice: 50000 },
        { planId: 2, planType: 'Offline', planUnitPrice: 80000 }
      ],
      trainerDescription: 'Saya adalah seorang personal trainer dengan 5 tahun lebih pengalaman melatih binaragawan lokal di daerah Bandung.',
      trainerTags: ['tag 1', 'asdtag 2', 'taasdasdasdasg 3', 'taasdasdg 4', 'taasdg 4', 'tag 4', 'taasdasdasdasdg 4']
    }

  const renderPlan = ({ item }) => {
      return (
        <View style = {{marginVertical : 10}}>
          <TrainerPlan planType={item.type} planUnitPrice={item.price} />
        </View>
      )
  };

  const renderReview = ({ item }) => {
    return (
      <View style = {{margin : 0}}>
        <UserReview reviewId={item.id_review} userFullName={item.name_user} rating={item.star} review={item.content_review} />
      </View>
    )
  };

  const renderTags = ({ item }) => {
    return (
      <View style = {styles.tagContainer}>
        <Text>
          {item}
        </Text>
      </View>
    )
  };

  useEffect(  () => {
    // getTrainerData;
    getTrainerData();
    getPricingData();
    getReviewData();
    console.log(pathname) 
    // console.log(trainerData)
    // console.log("TASF",trainerData)

  }, [currentScreen]);

  if (loading1 || loading2 || loading3 || loading4 || (trainerData == null) || (pricingData == null) || (reviewData == null) ) {
    return <LoadingScreen/>
  } else {

  // console.log(reviewData)
  // console.log(trainerData)
  // console.log(pricingData)

  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (25/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
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
            <TrainerProfile trainerName={trainerData.nama_trainer} trainerUsername={trainerData.username} trainerRating={trainerData.rating} trainerCity={trainerData.location}/>
            <Link href="/(tabs)/workout" asChild>
              <Pressable> 
                <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                </View>
              </Pressable>
            </Link>
        </View>

        <View style={{ width: screenWidth, height: screenWidth * (650/360), borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor:'#FEFEFE', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 30, paddingTop: 30 }}>
          {/* Button and Content */}
          <View style={{ alignItems: 'center'}}>
            <View style={styles.buttonContainer}>
              <View style={[styles.button, {backgroundColor: currentScreen === 'Details' ? '#FF7D40' : null}]}>
                <TouchableOpacity onPress={() => handleScreenChange('Details')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: currentScreen === 'Details' ? '#FEFEFE' : '#FF7D40', fontWeight: 'bold' }}>Details</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.button, {backgroundColor: currentScreen === 'Pricing' ? '#FF7D40' : null}]}>
                <TouchableOpacity onPress={() => handleScreenChange('Pricing')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: currentScreen === 'Pricing' ? '#FEFEFE' : '#FF7D40', fontWeight: 'bold' }}>Pricing</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.button, {backgroundColor: currentScreen === 'Review' ? '#FF7D40' : null}]}>
                <TouchableOpacity onPress={() => handleScreenChange('Review')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: currentScreen === 'Review' ? '#FEFEFE' : '#FF7D40', fontWeight: 'bold' }}>Review</Text>
                </TouchableOpacity>
              </View>
            </View>

            {currentScreen === 'Details' && (
              <View style={{ width: screenWidth * (310/360), flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 30 }}>
               <View style={{ width: screenWidth * (310/360), flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 15 }}>
                 <Text style={{ color: '#444444', fontSize: 20, fontWeight: 'bold' }}>
                   About {trainerData.nama_trainer}
                 </Text>
                 <Text style={{ color: '#444444', fontSize: 14, fontWeight: 'normal', lineHeight: 25 }}>
                   {trainerData.description}
                 </Text>
               </View>
               <View style={{ width: screenWidth * (310/360), flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 15 }}>
                 <Text style={{ color: '#444444', fontSize: 20, fontWeight: 'bold' }}>
                   Tags
                 </Text>
                 <ScrollView horizontal = {true}>
                   <View style={{ width: screenWidth * (310/360) }}>
                     <FlatList
                       contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}}
                       data={tagData}
                       renderItem={renderTags}
                       keyExtractor={(item, index) => index.toString()}
                     />
                   </View>
                 </ScrollView>
               </View>
             </View>
            )}

            {currentScreen === 'Pricing' && (
              <View style={{ width: screenWidth * (310/360), flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 30 }}>
               <View style={{ width: screenWidth * (310/360), flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 15 }}>
                 <Text style={{ color: '#444444', fontSize: 20, fontWeight: 'bold' }}>
                   {trainer.trainerName}'s Plan
                 </Text>
                 <ScrollView horizontal = {true}>
                   <View style={{ width: screenWidth * (310/360), gap: 10 }}>
                     <FlatList
                       data={pricingData}
                       renderItem={renderPlan}
                       keyExtractor={item => item.planId}
                       style = {{maxWidth : screenWidth * (310/360)}}
                     />
                   </View>
                 </ScrollView>
               </View>
             </View>
            )}

            {currentScreen === 'Review' && (
              <View style={{ width: screenWidth * (310/360), flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 30 }}>
               <View style={{ width: screenWidth * (310/360), flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 15 }}>
                 <View style={{ width: screenWidth * (310/360), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={{ color: '#444444', fontSize: 20, fontWeight: 'bold' }}>
                    User Reviews
                  </Text>
                  <Text style={{ color: '#444444', fontSize: 16 }}>
                    {reviewData.length} Reviews
                  </Text>
                 </View>
                 
                 
                 <ScrollView>
                   <View style={{ flexDirection: 'row' }}>
                     <FlatList
                        horizontal={true}
                        data={reviewData}
                        renderItem={renderReview}
                        keyExtractor={item => item.reviewId}
                     />
                   </View>
                 </ScrollView>
               </View>
             </View>
            )}
          </View>

          {/* Reserve Button */}
          <TouchableOpacity onPress={() => {router.navigate("/(tabs)/find_Trainer/trainer_reserve/"+trainer_id)}} style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ borderRadius: 16, width: screenWidth * (300/360), height: screenWidth * (56/360), backgroundColor: '#FF7D40', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color: '#FEFEFE', fontWeight: 'bold'}}>Reserve</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
    
  )
}
}
const styles = StyleSheet.create({
  layout: {
    flex: 1,
    width: Dimensions.get("window").width , //for full screen
    height: Dimensions.get("window").height ,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEAD9',
    position : "relative"
  },
  buttonContainer: { 
    width: screenWidth * (318/360), 
    height: screenWidth * (40/360), 
    borderWidth: 2,  
    borderRadius: 12, 
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    borderColor: '#FF7D40',
    marginBottom: 30
  },
  button: {
    flex: 1, 
    width: screenWidth * (135/360),
    height: screenWidth * (40/360),  
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  tagContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFEAD9',
    marginHorizontal: 2.5, 
    marginVertical: 5, 
  },
});