import React, { useState } from 'react';
import { CheckBox } from 'react-native-btr';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { useCart } from '@/provider/CartProvider';

interface ReserveTrainerCartProps {
  id : number
  onlineBundle?: 0 | 3 | 5 | 10;
  offlineBundle?: 0 | 3 | 5 | 10;
  offlineUnitPrice?: number;
  onlineUnitPrice?: number;
  trainerName?: string;
  removeFromCart?
}

const screenWidth = Dimensions.get('window').width;

const ReserveTrainerCart: React.FC<ReserveTrainerCartProps> = ({id, onlineBundle, offlineBundle, offlineUnitPrice, onlineUnitPrice, trainerName, removeFromCart }) => {
    const [onlineSelected, setOnlineSelected] = useState(true);
    const [offlineSelected, setOfflineSelected] = useState(true);
    let containerHeight, finalOnlinePrice, finalOfflinePrice
    let onlineDiscount = 0 
    let offlineDiscount = 0

    if (onlineBundle || offlineBundle) {
        containerHeight = 130
    }

    if (onlineBundle && offlineBundle) {
            containerHeight = 190
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
                <View style={{marginBottom: 10, marginHorizontal: 8, backgroundColor: '#E1E1E1', width: screenWidth * (300/360), height: 2, borderRadius: 16}}></View>
                {onlineBundle != 0 && (
                    <View style={{marginBottom: 10, marginHorizontal: 15,width: screenWidth * (280/360), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                        <View style={{gap: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            {/* <TouchableOpacity onPress={handlePressOnline} style={{ width: 20, height: 20, borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                {onlineSelected ? (
                                    <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40', justifyContent: 'center', alignItems: 'center' }} >
                                    <Image
                                    style={{ width: screenWidth * (10 / 360), height: screenWidth * (10 / 360) }}
                                    source={require('@/assets/icons/check.png')}
                                    />
                                </View>
                                ) : (
                                    <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#FF7D40' }} />
                                )}
                            </TouchableOpacity> */}
                            <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 10 }}>
                                <Text style={{fontSize: 16 }}>{onlineBundle}x Online Sessions</Text>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>Rp{finalOnlinePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {removeFromCart(id, "Online")}}>
                        <View>
                        <Image style= {{width : screenWidth * (24/360), height : screenWidth * (24/360), }} source={require("@/assets/icons/x.png")}/> 
                        </View>
                        </TouchableOpacity>
                    </View>
                )}
                {offlineBundle != 0 && (
                    <View style={{marginHorizontal: 15,width: screenWidth * (280/360), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                        <View style={{gap: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            {/* <TouchableOpacity onPress={handlePressOffline} style={{ width: 20, height: 20, borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                {offlineSelected ? (
                                    <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#FF7D40' , backgroundColor: '#FF7D40', justifyContent: 'center', alignItems: 'center' }} >
                                    <Image
                                    style={{ width: screenWidth * (10 / 360), height: screenWidth * (10 / 360) }}
                                    source={require('@/assets/icons/check.png')}
                                    />
                                </View>
                                ) : (
                                    <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: '#FF7D40' }} />
                                )}
                            </TouchableOpacity> */}
                            <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 10 }}>
                                <Text style={{fontSize: 16 }}>{offlineBundle}x Offline Sessions</Text>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>Rp{finalOfflinePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {removeFromCart(id, "Offline")}}>
                        <View>
                        <Image style= {{width : screenWidth * (24/360), height : screenWidth * (24/360), }} source={require("@/assets/icons/x.png")}/> 
                        </View>
                        </TouchableOpacity>
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
    width: screenWidth * (320/360),
    borderWidth: 2.5,
    backgroundColor: 'white',
    padding: 0,
    borderColor: '#E1E1E1'
  },
});

export default ReserveTrainerCart;