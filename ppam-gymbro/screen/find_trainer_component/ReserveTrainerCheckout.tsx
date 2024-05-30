import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';

interface ReserveTrainerCheckoutProps {
  onlineBundle?: 3 | 5 | 10;
  offlineBundle?: 3 | 5 | 10;
  offlineUnitPrice?: number;
  onlineUnitPrice?: number;
  trainerName?: string;
}

const ReserveTrainerCheckout: React.FC<ReserveTrainerCheckoutProps> = ({ onlineBundle, offlineBundle, offlineUnitPrice, onlineUnitPrice, trainerName }) => {
    const [onlineSelected, setOnlineSelected] = useState(true);
    const [offlineSelected, setOfflineSelected] = useState(true);

    let containerHeight, finalOnlinePrice, finalOfflinePrice
    let onlineDiscount = 0 
    let offlineDiscount = 0

    let twoItem = false;

    if (onlineBundle || offlineBundle) {
        containerHeight = 130
    }

    if (onlineBundle && offlineBundle) {
            containerHeight = 190
            twoItem = true
    }

    if (onlineUnitPrice) {
        if (onlineBundle === 5) {
            onlineDiscount = 0.05
        } else if (onlineBundle === 10) {
            onlineDiscount = 0.10
        }

        finalOnlinePrice = onlineUnitPrice * onlineBundle * (1-onlineDiscount)
    }

    if (offlineUnitPrice) {
        if (offlineBundle === 5) {
            offlineDiscount = 0.05
        } else if (offlineBundle === 10) {
            offlineDiscount = 0.10
        }

        finalOfflinePrice = offlineUnitPrice * offlineBundle * (1-offlineDiscount)
    }

    const handlePressOnline = () => {
        console.log('test')
        setOnlineSelected(!onlineSelected);
    };

    const handlePressOffline = () => {
        console.log('test')
        setOfflineSelected(!offlineSelected);
    };


    return (
        <>
        {(onlineBundle || offlineBundle) && (
            <View style={[styles.mainContainer, {height: containerHeight}]}>
                <Text style={{marginHorizontal: 20, marginVertical: 13, fontWeight: 'bold', fontSize: 16}}>{trainerName}</Text>
                <View style={{marginBottom: 10, marginHorizontal: 8, backgroundColor: '#E1E1E1', width: 300, height: 2, borderRadius: 16}}></View>
                {onlineBundle && (
                    <View style={{marginBottom: 10, marginHorizontal: 15,width: 280, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <View style={{gap: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            <Text>1.</Text>
                            <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 10 }}>
                                <Text style={{fontSize: 16 }}>{onlineBundle}x Online Sessions</Text>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>Rp{finalOnlinePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                            </View>
                        </View>
                    </View>
                )}
                {offlineBundle && (
                    <View style={{marginHorizontal: 15,width: 280, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <View style={{gap: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            <Text>{twoItem ? '2.' : '1.'}</Text>
                            <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 10 }}>
                                <Text style={{fontSize: 16 }}>{offlineBundle}x Offline Sessions</Text>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>Rp{finalOfflinePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        )}
        </>
    );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 16,
    width: 320,
    borderWidth: 2.5,
    backgroundColor: 'white',
    padding: 0,
    borderColor: '#E1E1E1'
  },
});

export default ReserveTrainerCheckout;