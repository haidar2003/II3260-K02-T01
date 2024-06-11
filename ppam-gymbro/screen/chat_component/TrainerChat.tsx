import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface TrainerChatProps {
    trainerId: string,
    trainerName?: string,
    lastMessage?: string,
    lastMessageTime?: string,
  }
  
  const TrainerChat: React.FC<TrainerChatProps> = ({trainerId, trainerName, lastMessage, lastMessageTime }) => {
    return (
    <TouchableOpacity onPress={() => {router.navigate("/(tabs)/message_trainer/"+trainerId)}}>
      <View style={styles.mainContainer}> 
        <Image
            style = {{ width: 52, height: 52, borderRadius: 36 }}
            source = {require("@/assets/Racist_Cat.webp")}
        />
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: screenWidth * (253/360), gap: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: screenWidth * (253/360) }}>
                <Text style={{ color: '#444444', fontSize: 16, fontWeight: 'bold' }}>
                    {trainerName}
                </Text>
                <Text style={{ color: '#7F7F7F', fontSize: 12 }}>
                    {lastMessageTime}
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', maxWidth: screenWidth * (200/360) }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: '#7F7F7F', fontSize: 14 }}>
                    {lastMessage}
                </Text>
            </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        width: screenWidth * (320/360),
        gap: 15
    },
    circle: {
        width: 52,
        height: 52,
        borderRadius: 36, 
        backgroundColor: 'grey',
    },
});

export default TrainerChat;