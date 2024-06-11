import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import TrainerChat from '@/screen/chat_component/TrainerChat';
import { useAuth } from '@/provider/AuthProvider';
import { supabase } from '@/utils/supabase';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';

const screenWidth = Dimensions.get('window').width;

export default function TrainerChatList() {
  const currentUserId = 1;
  const {session,authLoading,userData,getSession,updateUserData} = useAuth()
  const [messageData, setMessageData] = useState(null)
  const [chatData, setChatData] = useState(null)
  const [trainerData, setTrainerData] = useState(null)
  const [loading , setLoading] = useState(false)
  

  const getMessageData = async () => {
    setLoading(true)
    const id_current_user = userData.id_user

  const {data , error} = await supabase.from("Chat").select("*").eq('id_user', id_current_user)
      if (error) {
        console.error(error)
      } 
      else {
        const {data : data2 , error : error2} = await supabase.from("Trainer").select("*") 
        if (error2) {
          console.log(error2)
        } else {
          const {data : data3, error : error3} = await supabase.from("Message").select("*")
            if (error3) {
              console.log(error3)
            } else {
              


              const ChatInput = await data.map( chatItem => {
                const matchingTrainer = data2.find(trainerItem => 
                  trainerItem.trainer_id == chatItem.id_trainer
                ) 
                const matchingMessage = data3.filter(messageItem => messageItem.id_chat == chatItem.id_chat)
                if (matchingMessage.length <= 0) {
                  matchingMessage.push({id_chat : chatItem.id_chat, content : "Tidak ada Pesan", date : new Date(), messageType : "Trainer"})
                }
                const latestMessage = matchingMessage.reduce((latest, current) => {
                  const latestDate = new Date(latest.date);
                  const currentDate = new Date(current.date);
                
                  return currentDate > latestDate ? current : latest;
                }, matchingMessage[0]);
                // console.log("A",matchingTrainer)
                // console.log("B",latestMessage)
                // console.log("C",latestMessage)
                // console.log("D", new Date(latestMessage.date))
                return {id : chatItem.id_chat, nama_trainer : matchingTrainer.nama_trainer, id_trainer : chatItem.id_trainer,
                  lastMessage : latestMessage.content, lastMessageTIme : latestMessage.date
                }
                
              })
              console.log(ChatInput)
              setChatData(ChatInput)
            }
        } 
      }
    setLoading(false)
  }



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
    
    if (item.lastMessage !== null) {
      const lastMessage = item.lastMessage;
      
      if (lastMessage) {
        const lastMessageTime = new Date(item.lastMessageTIme);
        // console.log("G", item.lastMessageTIme)
        // console.log("E", lastMessageTime)
        if (!isSameDayAsToday(lastMessageTime)) {
          displayedTime = `${lastMessageTime.getDate()}/${
            lastMessageTime.getMonth() + 1
          }/${lastMessageTime.getFullYear()}`;
        } else {
          displayedTime = `${lastMessageTime.getHours()}.${String(lastMessageTime.getMinutes() + 1).padStart(2, '0')}`
        }
      }
      // console.log("F", displayedTime)
      return (
        <View style={{ marginVertical: screenWidth * (15 / 360) }}>
          <TrainerChat
            trainerId={item.id_trainer}
            trainerName={item.nama_trainer}
            lastMessage={lastMessage ? lastMessage : ''}
            lastMessageTime={displayedTime}
          />
        </View>
      );
    } else {
      return (
        <View style={{ marginVertical: screenWidth * (5 / 360) }}>
          <TrainerChat
            trainerId={item.id}
            trainerName={item.trainerName}
            lastMessage="No messages"
            lastMessageTime=""
          />
        </View>
      );
    }
  };

  useEffect(() => {getMessageData()}, [])

  if (loading) {
    return <LoadingScreen></LoadingScreen>
  }

  return (
    <View style={styles.layout}>
      {/* <View style={{position : "absolute", top : 0, left : 0}}> */}
        <View style = {styles.topBar}>
          {/* Yang atas */}
          <View style = {{flex : 1}}></View>
          <View style = {{flex : 4, alignItems : "center", justifyContent : "flex-start", marginTop : 5, flexDirection : "row"}}>  
            <View style={styles.searchBar}>  
              <Image source={require("@/assets/icons/search.png")} style = {{ width: 25, height: 25, margin : 20 }}>
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
                    data={chatData}
                    renderItem={renderChat}
                    keyExtractor={item => item.id_chat}
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