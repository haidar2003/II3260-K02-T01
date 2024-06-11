import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import * as Progress from 'react-native-progress';

const screenWidth = Dimensions.get('window').width;

interface UserReviewProps {
    reviewId?: number,
    userFullName?: string,
    rating?: number,
    review?: string,
  }
  
  const UserReview: React.FC<UserReviewProps> = ({ userFullName, rating, review }) => {
    return (
      <View style={styles.mainContainer}> 
        <View style= {{marginTop: 0, marginBottom: 15, gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
          <Image
                style = {{ width: 50, height: 50, borderWidth: 2, borderRadius: 36, borderColor: '#FEFEFE' }}
                source = {require("@/assets/Racist_Cat.webp")}
          />
            <View style={{gap: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>{userFullName}</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>⭐ {rating}</Text>
            </View>
        </View> 
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14 , lineHeight: 25}}>{review}</Text>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 16,
        width: screenWidth * (220/360),
        height: screenWidth * (310/360),
        backgroundColor: 'white',
        padding: 15
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 36, 
        backgroundColor: 'grey',
    },
});

export default UserReview;