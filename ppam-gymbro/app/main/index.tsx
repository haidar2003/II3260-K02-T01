import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Dimensions, Image, Pressable} from 'react-native';
import { Link } from "expo-router"
// import {format} from "date-fns"
import CustomBox from "@/screen/workout_component/CustomBox";
import HomeTrainer from '@/screen/home_component/HomeTrainer';
export default function HomeScreen() {
  return (
    <View style={styles.layout} >
      <View style = {{flex : 1, width : "100%", flexDirection : "column", alignItems : "center", justifyContent : "flex-end", backgroundColor : "white"}}>
      <Link href={"/main/profile"} asChild>
        <Pressable>
        <View style = {{flex : 1, width : "100%", flexDirection : "row", alignItems : "center", justifyContent : "flex-start"}}> 
        

        
          <Image style = {{width : "20%", aspectRatio : 1, borderRadius : 1000, margin : 10}} source={require("@/assets/profile_picture_placeholder.jpg")}/>
          <View style ={{flex : 1, flexDirection : "column"}}>
            <Text style = {{fontSize : 12}}> Hello Arnold Schwarzenegger!</Text>
            {/* <Text style = {{fontSize : 18, fontWeight : "bold"}}>{format(new Date(), 'EEEE, dd MMMM') } </Text> */}
          </View>
        
        </View>
        </Pressable>
        </Link>  
      </View>
      <View style = {{flex : 2 ,width : "100%", alignItems : "center"}}>
        <HomeTrainer trainerName='Rubah Kampus' sessions={3}></HomeTrainer>
      </View>
      <View style = {{flex : 2,width : "100%"}}>
        <Text style = {{fontWeight : "bold", fontSize : 16, marginHorizontal : 40}}> Trainer Plan</Text>
        <View style = {{flex : 1, width : "100%", alignItems : "center"}}>
          <CustomBox difficulty='easy' location='main-home' type='trainer-plan' name='Core Plan 1'/>
        </View>
      </View>
      <View style = {{flex : 2,width : "100%"}}>
      <Text style = {{fontWeight : "bold", fontSize : 16, marginHorizontal : 40}}> Personal Plan</Text>
        <View style = {{flex : 1, width : "100%", alignItems : "center"}}>
          <CustomBox difficulty='easy' location='main-home' type='trainer-plan' name='Core Plan 2'/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(  {layout: {
  flex: 1,
  width: Dimensions.get("window").width , //for full screen
  height: Dimensions.get("window").height, //for full screen
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: 'white',
  position : "relative",
  padding : 10}
})