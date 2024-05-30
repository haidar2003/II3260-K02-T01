import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { SearchTrainerElement } from '@/utils/searchTrainerElement';

interface TrainerSelectProps {
    id : string;
    isActive?: boolean;
    isSelected?: boolean;
    trainerName?: string;
    onlineSessions?: number;
    offlineSessions?: number;
    monthPassed?: number;
    setSelected : (id: string) => void;
  }
  
const TrainerSelect: React.FC<TrainerSelectProps> = ({id, isSelected, isActive, trainerName, onlineSessions, offlineSessions, monthPassed, setSelected  }) => {
    let containerStyle, topContainerColor
    let roundingBottom = 12
    let fontColor = '#444444' 
    let onlineSessionFontWeight: string = "bold"
    let offlineSessionFontWeight: string = "bold"
    let onlineSessionFontColor: string = "#575757"
    let offlineSessionFontColor: string = "#575757"

    if (onlineSessions === 0){
      onlineSessionFontWeight = 'normal'
      onlineSessionFontColor = '#8F8F8F'
    }

    if (offlineSessions === 0){
      offlineSessionFontWeight = 'normal'
      offlineSessionFontColor = '#8F8F8F'
    }

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
        <TouchableOpacity onPress={() => {setSelected(id)}}>
        <View style={{backgroundColor: topContainerColor, width: 317, height: 66, paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 15, borderTopLeftRadius: 12,borderTopRightRadius: 12, borderBottomStartRadius: roundingBottom, borderBottomEndRadius: roundingBottom}}>
            <View style={styles.circle}>

            </View>
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
            <View style={{marginLeft: 25, marginTop: 10, marginBottom: 30, gap: 5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
              <Text style={{fontSize: 12, fontWeight: onlineSessionFontWeight, color: onlineSessionFontColor}}>• {onlineSessions} Online Sessions Left</Text>
              <Text style={{fontSize: 12, fontWeight: offlineSessionFontWeight, color: offlineSessionFontColor}}>• {offlineSessions} Offline Sessions Left</Text>
            </View>
            <View style={{marginLeft: 18, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10}}>
              <TouchableOpacity style={{ borderWidth: 2.5, borderColor: '#FF7D40', backgroundColor: '#FF7D40', height: 40, width: 135, borderRadius: 8, justifyContent: 'center' , alignItems: 'center'}}>
              <Text style={{color: "#FEFEFE", fontWeight: 'bold'}}>Invoice</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ borderWidth: 2.5, borderColor: '#FF7D40', backgroundColor: '#FF7D40', height: 40, width: 135, borderRadius: 8, justifyContent: 'center' , alignItems: 'center'}}>
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
    width: 320,
    height: 70,
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
    width: 320,
    height: 200,
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
    width: 320,
    height: 70,
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
    width: 320,
    height: 200,
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