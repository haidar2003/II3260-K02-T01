import { getImageNumber } from '@/utils/getImage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;


interface ChatBubbleProps {
    messageId?: number,
    messageType?: 'Trainer' | 'User',
    messageContent?: string,
    messageTime?: string,
  }
  
  const ChatBubble: React.FC<ChatBubbleProps> = ({ messageType, messageContent, messageTime }) => {
    
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent:'flex-start' }}>
            {(messageType === 'Trainer' && (
                <View style={styles.circle}>

                </View>
            ))}
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: (messageType === 'Trainer') ? 'flex-start' : 'flex-end'} }>
                <View style={ messageType == 'Trainer' ? styles.trainerBubble : styles.userBubble}> 
                    <Text style={{ color: '#444444', fontSize: 14 , lineHeight: 25}}>
                        {messageContent}
                    </Text>
                </View>
                <View style={{ padding: 8 }}>
                    <Text style={{ color: '#575757', fontSize: 12 }}>
                        {messageTime}
                    </Text>
                </View>
            </View>
        </View>
    );
  };

const styles = StyleSheet.create({
    userBubble: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFEAD9',
        maxWidth: screenWidth * (270/360),
        paddingHorizontal: screenWidth * (24/360),
        paddingVertical: screenWidth * (18/360),
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,
        borderBottomStartRadius: 24,
        borderBottomEndRadius: 8,
    },
    trainerBubble: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        maxWidth: screenWidth * (270/360),
        paddingHorizontal: screenWidth * (24/360),
        paddingVertical: screenWidth * (18/360),
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,
        borderBottomStartRadius: 8,
        borderBottomEndRadius: 24,
    },
    circle: {
        width: 52,
        height: 52,
        borderRadius: 36, 
        backgroundColor: 'grey',
        marginRight: screenWidth * (10/360),
        marginTop: screenWidth * (4/360)
    },
});

export default ChatBubble;