import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';

interface TrainingPlanProps {
  type?: string;
  price?: number;
}

const TrainingPlan: React.FC<TrainingPlanProps> = ({ type, price }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{ width: 308, height: 45, borderTopLeftRadius: 13, borderTopRightRadius: 13, backgroundColor: "#FF7D40", margin: 0, justifyContent: 'center', paddingLeft: 20 }}>
        <Text style={{ fontSize: 16, color: '#FEFEFE', fontWeight: 'bold' }}>{type} Training Plan</Text>
      </View>
      <Text style={{marginLeft: 20, marginTop: 12}}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Rp{price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        <Text style={{ fontSize: 16, color: '#8F8F8F' }}>/session</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 16,
    width: 310,
    height: 100,
    borderWidth: 2,
    borderColor: "#FF7D40",
    backgroundColor: 'white',
    padding: 0,
  },
});

export default TrainingPlan;