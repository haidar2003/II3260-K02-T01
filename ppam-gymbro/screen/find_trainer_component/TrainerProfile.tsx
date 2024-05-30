import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, StyleSheet } from 'react-native';

interface TrainerProfileProps {
  trainerName? : string;
  trainerUsername? : string,
  trainerRating? : number,
  trainerCity? : string
}

const TrainerProfile: React.FC<TrainerProfileProps> = ({ trainerName, trainerUsername, trainerRating, trainerCity }) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>

      </View>
      <View style={{ flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: 'white'}}>{trainerName}</Text>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>@{trainerUsername}</Text>
            <Text style={{color: 'white'}}>•</Text>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{backgroundColor: 'white', width: 10, height: 10}}></View>
                <Text style={{color: 'white'}}>{trainerRating}</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8}}>
            <View style={{backgroundColor: 'white', width: 10, height: 10}}></View>
            <Text style={{color: 'white'}}>{trainerCity}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 100, 
    backgroundColor: 'white',
},
});

export default TrainerProfile;