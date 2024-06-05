import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import ChatBubble from '@/screen/chat_component/ChatBubble';
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function TrainerChat() {
  const currentUserId = 1;
  const chatTrainerId = 1;

  function getDayName(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }

  const trainerChat = { 
    trainerId: 1, 
    trainerName: 'Raditya Azka', 
    message: [
        { messageId: 1, messageTime: new Date(2024, 6, 5, 13, 0, 0), messageType: 'Trainer', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
        { messageId: 2, messageTime: new Date(2024, 6, 5, 13, 10, 0), messageType: 'User', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
        { messageId: 3, messageTime: new Date(2024, 6, 5, 10, 0, 0), messageType: 'Trainer', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
        { messageId: 4, messageTime: new Date(2024, 6, 6, 11, 0, 0), messageType: 'User', messageContent: 'Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit' },
    ]
  }

  let lastDate

  const renderMessages = ({ item }) => {
    if (item.messageId === 1) {
      lastDate = item.messageTime;
  
      return (
        <View style={{ width: screenWidth * (340/360), alignItems: 'center', gap: 20, marginTop: 30 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#8F8F8F' }}>
            {`${getDayName(item.messageTime)}, ${item.messageTime.getDate()} ${item.messageTime.toLocaleString('default', { month: 'long' })}/${item.messageTime.getFullYear()}`}
          </Text>
          <View style={{ width: screenWidth * (340/360), alignItems: item.messageType === 'Trainer' ? 'flex-start' : 'flex-end' }}>
            <ChatBubble messageType={item.messageType} messageContent={item.messageContent} messageTime={`${item.messageTime.getHours()}.${String(item.messageTime.getMinutes() + 1).padStart(2, '0')}`}/>
          </View>
        </View>
      );
    } else {
      let printDate = false

      if (
        lastDate.getFullYear() !== item.messageTime.getFullYear() ||
        lastDate.getMonth() !== item.messageTime.getMonth() ||
        lastDate.getDate() !== item.messageTime.getDate()
      ) {
        printDate = true;
        lastDate = item.messageTime;
      }

      return (
        <View  style={{ width: screenWidth * (340/360), alignItems: 'center', gap: 20 }}>
          { printDate && (
              <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#8F8F8F' }}>
              {`${getDayName(item.messageTime)}, ${item.messageTime.getDate()} ${item.messageTime.toLocaleString('default', { month: 'long' })} ${item.messageTime.getFullYear()}`}
            </Text>
          )}
          <View style={{ width: screenWidth * (340/360), alignItems: item.messageType === 'Trainer' ? 'flex-start' : 'flex-end',  }}>
            <ChatBubble messageType={item.messageType} messageContent={item.messageContent} messageTime={`${item.messageTime.getHours()}.${String(item.messageTime.getMinutes() + 1).padStart(2, '0')}`}/>
          </View>
        </View>
      )
    }
  };


  return (
    <View style={styles.layout}>
      {/* <View style={{position : "absolute", top : 0, left : 0}}> */}
        <View style={{ width: '100%', marginTop: screenWidth * (35/360), paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (25/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Link href="/(tabs)/workout" asChild>
              <Pressable> 
                <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                </View>
              </Pressable>
            </Link>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
                {trainerChat.trainerName}
              </Text>
            </View>
            <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360) }}/>
        </View>
        <ScrollView style = {{flex : 1}} ref={ref => {this.scrollView = ref}} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
            <ScrollView>
              <View style={{ flexDirection: 'column' }}>
                <FlatList 
                  data={trainerChat.message}
                  renderItem={renderMessages}
                  keyExtractor={item => item.messageId}
                  style = {{maxWidth : "100%"}} 
                />
              </View>
            </ScrollView>
        </ScrollView>   
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: screenWidth * (10/360), marginVertical: 10 }}>
          <View style={{ width: screenWidth * (280/360), height: screenWidth * (50/360), borderWidth: 2, borderColor: '#EEEEEE', borderRadius: 40 }}>

          </View>
          <View style={{ width: screenWidth * (50/360), height: screenWidth * (50/360), backgroundColor: '#FF7D40', borderRadius: 40 }}>

          </View>
        </View>
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