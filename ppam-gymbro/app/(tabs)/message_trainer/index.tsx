import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import TrainerChat from '@/screen/chat_component/TrainerChat';

const screenWidth = Dimensions.get('window').width;

export default function TrainerChatList() {
  const currentUserId = 1;

  function isSameDayAsToday(date) {
    const today = new Date();
    const targetDate = new Date(date);
  
    return (
      today.getFullYear() === targetDate.getFullYear() &&
      today.getMonth() === targetDate.getMonth() &&
      today.getDate() === targetDate.getDate()
    );
  }

  const trainerChat = [
    { trainerId: 1, trainerName: 'Raditya Azka', message: [
        { messageId: 1, messageTime: new Date(2024, 5, 5, 13, 0, 0), messageType: 'Trainer', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
        { messageId: 2, messageTime: new Date(2024, 5, 5, 13, 10, 0), messageType: 'User', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
        { messageId: 3, messageTime: new Date(2024, 5, 5, 14, 0, 0), messageType: 'Trainer', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
        { messageId: 4, messageTime: new Date(2024, 5, 5, 15, 0, 0), messageType: 'User', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
    ]},
    { trainerId: 2, trainerName: 'Nazhif Haidar', message: [
        { messageId: 1, messageTime: new Date(2024, 6, 5, 13, 0, 0), messageType: 'Trainer', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
        { messageId: 2, messageTime: new Date(2024, 6, 5, 13, 10, 0), messageType: 'User', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
        { messageId: 3, messageTime: new Date(2024, 6, 6, 10, 0, 0), messageType: 'Trainer', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
        { messageId: 4, messageTime: new Date(2024, 6, 6, 11, 0, 0), messageType: 'User', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
    ]},
  ]

  const renderChat = ({ item }) => {
    let displayedTime;
  
    if (item.message.length !== 0) {
      const lastMessage = item.message[item.message.length - 1];
  
      if (lastMessage) {
        const lastMessageTime = new Date(lastMessage.messageTime);
  
        if (!isSameDayAsToday(lastMessageTime)) {
          displayedTime = `${lastMessageTime.getDate()}/${
            lastMessageTime.getMonth() + 1
          }/${lastMessageTime.getFullYear()}`;
        } else {
          displayedTime = `${lastMessageTime.getHours()}.${String(lastMessageTime.getMinutes() + 1).padStart(2, '0')}`
        }
      }
  
      return (
        <View style={{ marginVertical: screenWidth * (15 / 360) }}>
          <TrainerChat
            trainerId={item.trainerId}
            trainerName={item.trainerName}
            lastMessage={lastMessage ? lastMessage.messageContent : ''}
            lastMessageTime={displayedTime}
          />
        </View>
      );
    } else {
      return (
        <View style={{ marginVertical: screenWidth * (5 / 360) }}>
          <TrainerChat
            trainerId={item.trainerId}
            trainerName={item.trainerName}
            lastMessage="No messages"
            lastMessageTime=""
          />
        </View>
      );
    }
  };


  return (
    <View style={styles.layout}>
      {/* <View style={{position : "absolute", top : 0, left : 0}}> */}
        <View style = {styles.topBar}>
          {/* Yang atas */}
          <View style = {{flex : 1}}></View>
          <View style = {{flex : 4, alignItems : "center", justifyContent : "flex-start", marginTop : 5, flexDirection : "row"}}>  
            <View style={styles.searchBar}>  
              <Image source={require("@/assets/search.png")} style = {{margin : 20}}>
                {/* Icon Kaca Pembesar */}
              </Image>
              <TextInput>
                {/* Search Bar */}
              </TextInput>
            </View>
            
          </View>
        </View>
        <ScrollView style = {{flex : 1}}>
            <ScrollView horizontal = {true}>
                    <FlatList 
                    data={trainerChat}
                    renderItem={renderChat}
                    keyExtractor={item => item.trainerId}
                    style = {{maxWidth : "100%"}} 
                />
            </ScrollView>
        </ScrollView>   
    </View>

  )
}

const styles = StyleSheet.create({
  searchBar : {
    backgroundColor: '#fff', 
    justifyContent : "flex-start",
    alignItems : "center",
    flexDirection : "row",
    borderRadius : 30,
    width : screenWidth * (318/360),
    height : screenWidth * (38/360),
    maxHeight : 40,
    padding : 5,
    borderWidth: 2,
    borderColor: '#EEEEEE',
    marginTop: 5,
  },
  layout: {
    flex: 1,
    // flexDirection: 'row',
    width: Dimensions.get("window").width , //for full screen
    height: Dimensions.get("window").height, //for full screen
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    position : "relative"
  },
  topBar :{
    flex: 1,
    maxHeight : 110,
    width : "100%",
    alignItems : "center",
    justifyContent : "flex-end",
    backgroundColor : "#FF7D40",
    borderBottomLeftRadius : 20,
    borderBottomRightRadius : 20,
    marginTop : 0,
    marginBottom: 10
  },
  filter_sort : {
  flex : 1,
   maxHeight : 100,
   width : "100%",
   alignItems : "flex-start",
   justifyContent : "flex-end",
  //  backgroundColor : "black"
  },
  tags : {
    flex : 1,
    alignItems : "center",
    backgroundColor : "#FFEAD9",
    margin : 10,
    padding : 5
  },
  item: {
    width: 100, // Set width to control the spacing between items
    height: 100,
    backgroundColor: 'blue',
    margin: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  }, 
  grey : {
    backgroundColor : "grey", 
    position : 'absolute', 
    width: Dimensions.get("window").width , //for full screen
    height: Dimensions.get("window").height, //for full screen
    top : 0, 
    left : 0,
    opacity : 0.8,
    zIndex : 1,
    justifyContent : "flex-start"
  } ,

})