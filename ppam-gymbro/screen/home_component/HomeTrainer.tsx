import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';


interface HomeTrainer {
    trainerName?: string,
    sessions?: number,
  }
  
const HomeTrainer: React.FC<HomeTrainer> = ({ trainerName, sessions }) => {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.topContainer}>
            <View style={styles.circle}>

            </View>
            <View style={styles.topRightContainaer}>
                <Text style={{color: '#FEFEFE', fontSize: 12}}>Current Trainer</Text>
                <Text style={{color: '#FEFEFE', fontWeight: 'bold', fontSize: 16}}>{trainerName}</Text>
                <Text style={{color: '#FEFEFE', fontSize: 12}}>{sessions} sessions left</Text>
            </View>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={{ borderWidth: 2.5, borderColor: '#FEFEFE', backgroundColor: '#FEFEFE', height: 40, width: 140, borderRadius: 16, justifyContent: 'center' , alignItems: 'center'}}>
                <Text style={{color: '#444444', fontWeight: 'bold'}}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderWidth: 2.5, borderColor: '#FEFEFE', backgroundColor: '#FEFEFE', height: 40, width: 140, borderRadius: 16, justifyContent: 'center' , alignItems: 'center'}}>
                <Text style={{color: '#444444', fontWeight: 'bold'}}>Switch</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    circle: {
        width: 90,
        height: 90,
        borderRadius: 60, 
        backgroundColor: '#FEFEFE',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
        alignItems: 'center'
    },
    topRightContainaer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    containerStyle: {
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 15,
        width: 320,
        height: 180,
        borderRadius: 24,
        backgroundColor: '#FF7D40'
      },
})

export default HomeTrainer;