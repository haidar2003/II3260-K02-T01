import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

interface ReserveTrainerPlanProps {
  planType?: 'Online' | 'Offline';
  planBundle?: number;
  planUnitPrice?: number;
  isSelected?: boolean;
}

const screenWidth = Dimensions.get('window').width;

const ReserveTrainerPlan: React.FC<ReserveTrainerPlanProps> = ({ isSelected, planBundle, planType, planUnitPrice }) => {
    const [isAdding, setIsAdding] = useState(isSelected);

    let finalPrice = planUnitPrice * planBundle;
    let color, fontColor, fontColorDiscount;
    let discount = 0;

    if (isAdding) {
        color = '#FF7D40'
        fontColor = '#FF7D40'
        fontColorDiscount = 'white'
    } else {
        color = '#E1E1E1'
        fontColor = '#444444'
        fontColorDiscount = '#444444'
    }

    if (planBundle === 5) {
        if (planType === 'Online') {
            discount = 0.95;
            finalPrice = finalPrice * discount;
        } else {
            discount = 0.90;
            finalPrice = finalPrice * discount;
        }     
    } else if (planBundle === 10) {
        if (planType === 'Online') {
            discount = 0.90;
            finalPrice = finalPrice * discount;
        } else {
            discount = 0.85;
            finalPrice = finalPrice * discount;
        }
    }

  return (
    <View style={[styles.mainContainer, {borderColor: color}]}>
        <View style={{margin: 8}}>
            <Text style={{ fontSize: 20, color: fontColor, fontWeight: 'bold' }}>{planBundle}x</Text>
            <Text style={{ fontSize: 16, color: fontColor }}>{planType} Sessions</Text>
            <View style={{ marginVertical: 5, width: screenWidth * (140/360), height: 1, backgroundColor: color}}></View>
            <Text style={{ fontSize: 16, color: fontColor, fontWeight: 'bold' }}>Rp{finalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
        {(discount != 0) && (
            <>
            <View style={[styles.triangleCorner, {borderTopColor: color}]} ></View>
            <View style={{ position: 'absolute', bottom: 0, left: 0, padding: 8}}>
                <Text style={{fontSize: 12, color: fontColorDiscount}}>Save</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold',color: fontColorDiscount}}>{Math.round((1-discount)*100)}%</Text>
            </View>
            </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 16,
    width: screenWidth * (160/360),
    height: screenWidth * (200/360),
    borderWidth: 2.5,
    backgroundColor: 'white',
    padding: 0,
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: screenWidth * (80/360),
    borderTopWidth: screenWidth * (80/360),
    borderTopLeftRadius: 12,
    borderRightColor: "transparent",
    transform: [{ rotate: "270deg" }]
  },
});

export default ReserveTrainerPlan;