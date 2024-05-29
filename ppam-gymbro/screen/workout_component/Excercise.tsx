import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';


interface ExcerciseProps {
    sets?: number;
    reps?: number;
    name?: string;
    number?: number;
    isChecked?: boolean;
  }
  
  const Excercise: React.FC<ExcerciseProps> = ({ sets, reps, name, isChecked, number }) => {
    const [isSelected, setSelection] = useState(isChecked);

    const handlePress = () => {
        console.log('test')
        setSelection(!isSelected);
    };

    return (
      <View style={styles.mainContainer}> 
        <View style= {styles.topContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{marginRight: 10}}>{number}.</Text>
                <View style={{gap: 5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <Text style={{fontWeight: 'bold'}}>{name}</Text>
                    <Text style={{fontSize: 12}}>{reps} reps • {sets} sets</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handlePress} style={{ width: 20, height: 20, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
            {isSelected ? (
                <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40' }} />
            ) : (
                <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#FF7D40' }} />
            )}
            </TouchableOpacity>
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
        width: 360,
        height: 60,
        paddingHorizontal: 30
    },
    mainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 360,
        height: 62,
        backgroundColor: 'white'

    },
    divider: {
        width: 340,
        height: 1,
        borderRadius: 20,
        backgroundColor: '#E1E1E1'
    }
});

export default Excercise;