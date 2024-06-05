
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity } from 'react-native';
import CustomBox from '@/screen/workout_component/CustomBox';
import { Link } from 'expo-router';
import Excercise from '@/screen/workout_component/Excercise';
import UserReview from '@/screen/find_trainer_component/UserReview';
import TrainerPlan from '@/screen/find_trainer_component/TrainerPlan';
import TrainerProfile from '@/screen/find_trainer_component/TrainerProfile';

const screenWidth = Dimensions.get('window').width;

export default function trainerProfile() {
    const trainerId = 1;

    const [currentScreen, setCurrentScreen] = useState('Details');

    const handleScreenChange = (screen) => {
      setCurrentScreen(screen);
    };

    
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
          <TrainerPlan planType={item.planType} planUnitPrice={item.planUnitPrice} />
        </View>
      )
  };

  const renderReview = ({ item }) => {
    return (
      <View style = {{margin : 0}}>
        <UserReview reviewId={item.reviewId} userFullName={item.userFullName} rating={item.rating} review={item.review} />
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

  return (
    <View style={styles.layout}>
      <ScrollView style = {{flex : 1}}>
        <View style={{ marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (25/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <Link href="/(tabs)/workout" asChild>
              <Pressable> 
                <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                </View>
              </Pressable>
            </Link>
            <TrainerProfile trainerName={trainer.trainerName} trainerUsername={trainer.trainerUsername} trainerRating={trainer.trainerRating} trainerCity={trainer.trainerCity}/>
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
                   About {trainer.trainerName}
                 </Text>
                 <Text style={{ color: '#444444', fontSize: 14, fontWeight: 'normal', lineHeight: 25 }}>
                   {trainer.trainerDescription}
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
                       data={trainer.trainerTags}
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
                       data={trainer.trainerPlan}
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
                    {trainer.trainerReview.length} Reviews
                  </Text>
                 </View>
                 
                 
                 <ScrollView>
                   <View style={{ flexDirection: 'row' }}>
                     <FlatList
                        horizontal={true}
                        data={trainer.trainerReview}
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
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ borderRadius: 16, width: screenWidth * (300/360), height: screenWidth * (56/360), backgroundColor: '#FF7D40', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color: '#FEFEFE', fontWeight: 'bold'}}>Reserve</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
    
  )
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