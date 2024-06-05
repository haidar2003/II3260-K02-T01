import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

interface TrainerPlanProps {
  planType?: 'Online' | 'Offline';
  planUnitPrice?: number;
}

const screenWidth = Dimensions.get('window').width;

const TrainerPlan: React.FC<TrainerPlanProps> = ({ planType, planUnitPrice }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{ width: screenWidth * (308/360), height: screenWidth * (45/360), borderTopLeftRadius: 13, borderTopRightRadius: 13, backgroundColor: "#FF7D40", margin: 0, justifyContent: 'center', paddingLeft: 20 }}>
        <Text style={{ fontSize: 16, color: '#FEFEFE', fontWeight: 'bold' }}>{planType} Training Plan</Text>
      </View>
      <Text style={{marginLeft: 20, marginTop: 12}}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Rp{planUnitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
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
    width: screenWidth * (310/360),
    height: screenWidth * (100/360),
    borderWidth: 2,
    borderColor: "#FF7D40",
    backgroundColor: 'white',
    padding: 0,
  },
});

export default TrainerPlan;