import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, StyleSheet } from 'react-native';

const ExcerciseProgress = () => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExcerciseProgress;