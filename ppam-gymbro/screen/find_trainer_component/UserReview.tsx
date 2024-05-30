import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';


interface UserReviewProps {
    username?: string,
    rating?: number,
    review?: string,
  }
  
  const UserReview: React.FC<UserReviewProps> = ({ username, rating, review }) => {
    return (
      <View style={styles.mainContainer}> 
        <View style= {{marginTop: 0, marginBottom: 15, gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <View style={styles.circle}>

            </View>
            <View style={{gap: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>{username}</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>⭐ {rating}</Text>
            </View>
        </View> 
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14 }}>{review}</Text>
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
        width: 220,
        height: 310,
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