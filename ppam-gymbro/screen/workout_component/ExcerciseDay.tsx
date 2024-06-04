import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

const screenWidth = Dimensions.get('window').width;

interface ExcerciseDayProps {
    day?: string;
    progress?: number;
    isCurrent?: boolean;
  }
  
  const ExcerciseDay: React.FC<ExcerciseDayProps> = ({ progress, isCurrent, day }) => {

    let fontStyle, fontColor;

    if (progress >= 100) {
        fontColor = '#E1E1E1'
    } else {
        fontColor = '#575757'
    }

    if (isCurrent) {
        fontStyle = 'bold'
    } else {
        fontStyle = 'normal'
    }

    return (
      <View style={styles.mainContainer}>   
        <View style= {styles.topContainer}>
            <Text style={{color: fontColor, fontWeight: fontStyle}} >Day {day}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                <View>
                    <Progress.Bar borderWidth={0} unfilledColor='#FDE4D3' progress={progress/100} width={screenWidth * (140/360)} color='#FF7D40'/>
                </View>
                { (progress === 100) ? (
                    <View style={styles.circle}>

                    </View>
                ) : (
                    <View style={{marginLeft: 18, width: 30, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <Text style={{fontWeight: fontStyle}}>{progress}%</Text>
                    </View>
                )}
            </View>
        </View>
        <View style={styles.divider}></View>
      </View>
    );
  };

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth,
        height: screenWidth * (60/360),
        paddingHorizontal: 30
    },
    mainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: screenWidth,
        height: screenWidth * (62/360),
        backgroundColor: 'white'

    },
    circle: {
        marginLeft: 18,
        width: 30,
        height: 30,
        borderRadius: 36, 
        backgroundColor: '#FF7D40',
    },
    divider: {
        width: screenWidth * (340/360),
        height: 1,
        borderRadius: 20,
        backgroundColor: '#E1E1E1'
    }
});

export default ExcerciseDay;