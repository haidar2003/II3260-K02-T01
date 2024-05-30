import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, StyleSheet } from 'react-native';

interface ExcerciseProgressProps {
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'; 
  duration: number
}

const ExcerciseProgress: React.FC<ExcerciseProgressProps> = ({ duration, difficulty }) => {
  return (
    <View style={styles.container}>
      <Progress.Circle
        color='#FF7D40'
        progress={0.8}
        unfilledColor='#FDE4D3'
        size={160}
        thickness={10}
        strokeCap='round'
        borderWidth={0}
        showsText
        formatText={() => <View style={{paddingBottom: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{margin: 0, color: '#444444', fontSize: 24}}>Day</Text>
            <Text style={{margin: 0, fontWeight: 'bold', color: '#444444', fontSize: 24}}>5</Text>
        </View>}
      />
      <View style={{marginTop: 15, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5}}>
        {difficulty && ( 
                <Text style={{fontSize: 12}}>
                  {difficulty === 'Beginner' && 1}
                  {difficulty === 'Intermediate' && 2}
                  {difficulty === 'Advanced' && 3}
                  {difficulty === 'Expert' && 4}
                </Text>
        )}
        <Text style={{fontSize: 12, color: '#444444'}}>{difficulty}</Text>
      </View>
      <Text style={{fontSize: 12, fontWeight: 'bold', color: '#444444'}}>{duration} Days</Text>
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