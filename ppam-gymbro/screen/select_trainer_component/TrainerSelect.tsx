import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { SearchTrainerElement } from '@/utils/searchTrainerElement';
import { router } from 'expo-router';
import { getImageNumber, referenceImage } from '@/utils/getImage';


interface TrainerSelectProps {
    trainerId : number;
    isActive?: boolean;
    isSelected?: boolean;
    trainerName?: string;
    onlineSessions?: number;
    offlineSessions?: number;
    monthPassed?: number;
    setSelected : (trainerId: number) => void;
    setReviewVisible : (isVisible : boolean) => void
}

const screenWidth = Dimensions.get('window').width;
  
const TrainerSelect: React.FC<TrainerSelectProps> = ({ trainerId, isSelected, isActive, trainerName, onlineSessions, offlineSessions, monthPassed, setSelected, setReviewVisible }) => {
    let containerStyle, topContainerColor
    let roundingBottom = 12
    let fontColor = '#444444' 
    const imageNumber = getImageNumber(trainerName)
    if (isActive) {
        if (isSelected) {
            containerStyle = styles.activeTrainerSelected
            topContainerColor = '#FF7D40'
            roundingBottom = 0
            fontColor = '#FEFEFE'
        } else {
            containerStyle = styles.activeTrainer
            topContainerColor = "#FEFEFE"
        }
    } else {
        if (isSelected) {
            containerStyle = styles.pastTrainerSelected
            topContainerColor = '#FF7D40'
            roundingBottom = 0
            fontColor = '#FEFEFE'
        } else {
            containerStyle = styles.pastTrainer
            topContainerColor = "#FEFEFE"
            fontColor = '#8F8F8F'
        }
    }

    return (
      <View style={containerStyle}>
        <TouchableOpacity onPress={() => {setSelected(trainerId)}} disabled={isSelected}>
        <View style={{backgroundColor: topContainerColor, width: screenWidth * (317/360), height: screenWidth * (66/360), paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 15, borderTopLeftRadius: 12,borderTopRightRadius: 12, borderBottomStartRadius: roundingBottom, borderBottomEndRadius: roundingBottom}}>
            <Image
                style = {{ width: 50, height: 50, borderWidth: 2, borderRadius: 36, borderColor: '#FEFEFE' }}
                source = {referenceImage[imageNumber]}
            />
            <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 5}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: fontColor}}>{trainerName}</Text>
                {(isActive && isSelected) && (<Text style={{fontSize: 12, fontWeight: 'bold', color: fontColor}}>Current Trainer</Text>)}
                {(isActive && !isSelected) && (<Text style={{fontSize: 12, color: fontColor}}>{onlineSessions + offlineSessions} Sessions Left</Text>)}
                {(!isActive) && 
                  (monthPassed === 1 ? 
                    ((<Text style={{fontSize: 12, color: fontColor}}>Last Month</Text>)) : 
                    (<Text style={{fontSize: 12,  color: fontColor}}>{monthPassed} Months Ago</Text>))
                }
            </View>
        </View>
        {isSelected && (
          <View>
            <View style={{marginLeft: 25, marginTop: 10, marginBottom: 20, gap: 5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
              <Text style={{fontSize: 12, fontWeight: onlineSessions === 0 ? 'normal' : 'bold', color: onlineSessions === 0 ? '#8F8F8F' : '#444444'}}>• {onlineSessions} Online Sessions Left</Text>
              <Text style={{fontSize: 12, fontWeight: offlineSessions === 0 ? 'normal' : 'bold', color: offlineSessions === 0 ? '#8F8F8F' : '#444444'}}>• {offlineSessions} Offline Sessions Left</Text>
            </View>
            <View style={{marginLeft: 18, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10}}>
              <TouchableOpacity onPress={() => {console.log("/(tabs)/find_Trainer/past_invoice/"+trainerId);router.navigate("/(tabs)/find_Trainer/past_invoice/"+trainerId)}} style={{ borderWidth: 2.5, borderColor: '#FF7D40', backgroundColor: '#FF7D40', height: screenWidth * (40/360), width: screenWidth * (135/360), borderRadius: 8, justifyContent: 'center' , alignItems: 'center'}}>
              <Text style={{color: "#FEFEFE", fontWeight: 'bold'}}>Invoice</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => {setReviewVisible(true)}} style={{ borderWidth: 2.5, borderColor: '#FF7D40', backgroundColor: '#FF7D40', height: screenWidth * (40/360), width: screenWidth * (135/360), borderRadius: 8, justifyContent: 'center' , alignItems: 'center'}}>
                <Text style={{color: "#FEFEFE", fontWeight: 'bold'}}>Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
  activeTrainer: {
    width: screenWidth * (320/360),
    height: screenWidth * (70/360),
    backgroundColor: "#FEFEFE",
    borderWidth: 2,
    borderColor: '#D9D9D9',
    padding: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 16,
  },
  activeTrainerSelected: {
    width: screenWidth * (320/360),
    height: screenWidth * (190/360),
    backgroundColor: "#FEFEFE",
    borderWidth: 2,
    borderColor: '#FF7D40',
    padding: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 16,
  },
  pastTrainer: {
    width: screenWidth * (320/360),
    height: screenWidth * (70/360),
    backgroundColor: "#FEFEFE",
    borderWidth: 2,
    borderColor: '#D9D9D9',
    padding: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 16,
  },
  pastTrainerSelected: {
    width: screenWidth * (320/360),
    height: screenWidth * (190/360),
    backgroundColor: "#FEFEFE",
    borderWidth: 2,
    borderColor: '#FF7D40',
    padding: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 16,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 36, 
    backgroundColor: 'grey'
  },
});

export default TrainerSelect;