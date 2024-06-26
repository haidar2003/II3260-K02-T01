import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { supabase } from '@/utils/supabase';

interface ExcerciseProps {
    excerciseId: number;
    excerciseName?: string;
    isFinished?: boolean;
    sets?: number;
    reps?: number;
  }

const screenWidth = Dimensions.get('window').width;
  
  const Excercise: React.FC<ExcerciseProps> = ({ sets, reps, excerciseName, isFinished, excerciseId }) => {
    const [isSelected, setSelection] = useState(isFinished);

    const handlePress = async () => {
        console.log('test')
        setSelection(!isSelected);
        const {data, error} = await supabase.from("Workout").update([{
            isDone : (!isSelected)
        }]).eq("id_workout", excerciseId)
        if (error){
            console.log("change exercise failed",error)
        }
    };

    return (
      <View style={styles.mainContainer}> 
        <View style= {styles.topContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{marginRight: 10}}>{excerciseId}.</Text>
                <View style={{gap: 5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <Text style={{fontWeight: 'bold'}}>{excerciseName}</Text>
                    <Text style={{fontSize: 12}}>{reps} reps • {sets} sets</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handlePress} style={{ width: 20, height: 20, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
            {isSelected ? (
                <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40', justifyContent: 'center', alignItems: 'center' }} >
                    <Image
                    style={{ width: screenWidth * (10 / 360), height: screenWidth * (10 / 360) }}
                    source={require('@/assets/icons/check.png')}
                    />
                </View>
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
    divider: {
        width: screenWidth * (340/360),
        height: 1,
        borderRadius: 20,
        backgroundColor: '#E1E1E1'
    }
});

export default Excercise;