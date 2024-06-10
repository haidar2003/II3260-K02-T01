import { StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TrainerSelect  from '@/screen/select_trainer_component/TrainerSelect';
import ChatBubble from '@/screen/chat_component/ChatBubble';
import { Link, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/provider/AuthProvider';
import { supabase } from '@/utils/supabase';
import LoadingScreen from '@/screen/loading_screen/loadingScreen';
const screenWidth = Dimensions.get('window').width;

export default function TrainerChat() {
  const  lastDate = useRef(null) 
  const {id_trainer} = useLocalSearchParams();
  const {session,authLoading,userData,getSession,updateUserData} = useAuth()
  const [messageList, setMessageList] = useState(null)
  const [trainerData, setTrainerData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userMessage, setUserMessage] = useState('')
  const currentUserId = userData.id_user;
  function getDayName(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }
  const getMessageData = async () => {
    setLoading(true)
    const {data, error} = await supabase.from("Chat").select("*").eq("id_trainer",id_trainer).single()
    if (error) {
      console.log("failed fetch message", error) 
    } else {
      
      const {data : data2, error : error2} = await supabase.from("Trainer").select("*").eq("trainer_id", id_trainer).single()
      if (error2) {
        console.log("failed fetch message trainer", error2)
      } else {
        const {data : data3, error : error3} = await supabase.from("Message").select("*").eq("id_chat", data.id_chat)
        if (error3) {
          console.log("failed fetch message trainer", error3)
        } else {
          console.log(data3)
          const earliestMessage = data3.reduce((earliest, current) => {
            const earliestDate = new Date(earliest.date);
            const currentDate = new Date(current.date);
            
            return currentDate < earliestDate ? current : earliest;
          }, data3[0]);
          console.log("A",earliestMessage.date)
          lastDate.current = new Date(earliestMessage.date)
          console.log("B",lastDate)
          setTrainerData(data2)
          setMessageList(data3)
        }
      }
    }
    setLoading(false)
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


  const renderMessages = ({ item }) => {
      let printDate = false
      
      const itemDateExtract = new Date(item.date)
      console.log("C",item)
      if (
        
        lastDate.current.getFullYear() !== itemDateExtract.getFullYear() ||
        lastDate.current.getMonth() !== itemDateExtract.getMonth() ||
        lastDate.current.getDate() !== itemDateExtract.getDate()
      ) {
        printDate = true;
        lastDate.current = itemDateExtract;
      }

      return (
        <View  style={{ width: screenWidth * (340/360), alignItems: 'center', gap: 20 }}>
          { printDate && (
              <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#8F8F8F' }}>
              {`${getDayName(itemDateExtract)}, ${itemDateExtract.getDate()} ${itemDateExtract.toLocaleString('default', { month: 'long' })} ${itemDateExtract.getFullYear()}`}
            </Text>
          )}
          <View style={{ width: screenWidth * (340/360), alignItems: item.messageType === 'Trainer' ? 'flex-start' : 'flex-end',  }}>
            <ChatBubble messageType={item.messageType} messageContent={item.content} messageTime={`${itemDateExtract.getHours()}.${String(itemDateExtract.getMinutes() + 1).padStart(2, '0')}`}/>
          </View>
        </View>
      )
  };
  useEffect(() => {getMessageData()}, [])
  
  if (loading) {
    return <LoadingScreen/>
  }

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

              <View style={{ flexDirection: 'column' }}>
                <FlatList 
                  data={messageList}
                  renderItem={renderMessages}
                  keyExtractor={item => item.id_message}
                  style = {{maxWidth : "100%"}} 
                />
              </View>   
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: screenWidth * (10/360), marginVertical: 10 }}>
          <TextInput
                    style={{ width: screenWidth * (280 / 360), height: screenWidth * (50 / 360), borderWidth: 2, borderColor: '#EEEEEE', borderRadius: 40, paddingHorizontal: 10 }}
                    value={userMessage}
                    onChangeText={setUserMessage}
          />
          <TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: screenWidth * (50/360), height: screenWidth * (50/360), backgroundColor: '#FF7D40', borderRadius: 40 }}>
              <Image
                style = {{ height: 25, width: 25, marginRight: 5 }}
                source = {require("@/assets/icons/continue_plan.png")}
              />
            </View>
          </TouchableOpacity>
          
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
    width: Dimensions.get("window").width , 
    height: Dimensions.get("window").height, 
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
  },
  tags : {
    flex : 1,
    alignItems : "center",
    backgroundColor : "#FFEAD9",
    margin : 10,
    padding : 5
  },
  item: {
    width: 100, 
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
    width: Dimensions.get("window").width ,
    height: Dimensions.get("window").height, 
    top : 0, 
    left : 0,
    opacity : 0.8,
    zIndex : 1,
    justifyContent : "flex-start"
  } ,

})