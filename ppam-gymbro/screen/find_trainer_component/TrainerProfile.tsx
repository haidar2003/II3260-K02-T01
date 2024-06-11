import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, StyleSheet, Image } from 'react-native';

interface TrainerProfileProps {
  trainerName? : string;
  trainerUsername? : string,
  trainerRating? : number,
  trainerCity? : string
}

const TrainerProfile: React.FC<TrainerProfileProps> = ({ trainerName, trainerUsername, trainerRating, trainerCity }) => {
  return (
    <View style={styles.container}>
      <Image
                style = {{ width: 140, height: 140, borderWidth: 5, borderRadius: 120, borderColor: '#FEFEFE' }}
                source = {require("@/assets/Racist_Cat.webp")}
      />

      <View style={{ flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: 'white'}}>{trainerName}</Text>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>@{trainerUsername}</Text>
            <Text style={{color: 'white'}}>•</Text>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                style = {{ width: 16, height: 16 }}
                source = {require("@/assets/icons/star_white.png")}
            />
                <Text style={{color: 'white'}}>{trainerRating}</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3}}>
          <Image
                style = {{ width: 16, height: 16 }}
                source = {require("@/assets/icons/location_white.png")}
            />
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