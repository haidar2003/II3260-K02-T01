import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, StyleSheet } from 'react-native';

//  planDifficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'; 

interface ExcerciseProgressProps {
  planDifficulty?: string; 
  planDuration: number;
  currentDay: number;
  currentProgress: number;
}

const ExcerciseProgress: React.FC<ExcerciseProgressProps> = ({ planDifficulty, planDuration, currentDay, currentProgress }) => {
  return (
    <View style={styles.container}>
      <Progress.Circle
        color='#FF7D40'
        progress={currentProgress/100}
        unfilledColor='#FDE4D3'
        size={160}
        thickness={10}
        strokeCap='round'
        borderWidth={0}
        showsText
        formatText={() => <View style={{paddingBottom: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{margin: 0, color: '#444444', fontSize: 24}}>Day</Text>
            <Text style={{margin: 0, fontWeight: 'bold', color: '#444444', fontSize: 24}}>{ currentDay }</Text>
        </View>}
      />
      <View style={{marginTop: 15, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5}}>
        {planDifficulty && ( 
                <Text style={{fontSize: 12}}>
                  {planDifficulty === 'Beginner' && 1}
                  {planDifficulty === 'Intermediate' && 2}
                  {planDifficulty === 'Advanced' && 3}
                  {planDifficulty === 'Expert' && 4}
                </Text>
        )}
        <Text style={{fontSize: 12, color: '#444444'}}>{planDifficulty}</Text>
      </View>
      <Text style={{fontSize: 12, fontWeight: 'bold', color: '#444444'}}>{planDuration} Days</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExcerciseProgress;