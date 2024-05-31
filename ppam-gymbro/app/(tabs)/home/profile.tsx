import { StyleSheet, Text, TextInput, View, Image, ScrollView, Dimensions, Pressable} from 'react-native';
import React, {useState} from 'react';
import { Link } from 'expo-router';


export default function Profile() {
    const [name, setName] = useState("Arnold Schwarzenegger")
    const [email, setEmail] = useState("TerminatorInbox@email.com")
    const [phone, setPhone] = useState("18004686287")
    const [password, setPassword] = useState("")
    const [hidePassword, setHidePassword] = useState(true)
    return (

        <View style={styles.layout}>
            <View style = {{flex : 1.5, width : "100%", justifyContent : "flex-end"}}>
                <View style = {{flex : 1}}></View>
                <View style = {{flex : 1, width : "100%", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
                    <Link href={"/(tabs)/home"} asChild>
                    <Pressable>
                    <Text style={{fontSize : 20, fontWeight : "bold"}}> Back </Text>
                    </Pressable>
                    </Link>
                    <Text style={{fontSize : 24, fontWeight : "bold"}}> Profile </Text>
                    <Text style={{fontSize : 20, fontWeight : "bold"}}> Save </Text>
                </View>
            </View>
            <View style = {{flex : 2, width : "100%", justifyContent : "flex-start", alignItems : "center", padding : 10}}>
                <Image style = {{flex : 2, aspectRatio : 1, borderRadius : 1000, margin : 10}} source={require("@/assets/profile_picture_placeholder.jpg")}/>
                <Text style = {{flex : 0.5, fontSize : 20, fontWeight : "bold"}}>Arnold Schwarzenegger</Text>
                <Text style = {{flex : 0.5 , fontSize : 16, fontWeight : "400"}}>@Terminator</Text>
                <Text style = {{flex : 0.5 , fontSize : 16, fontWeight : "400"}}>17th August 2023</Text>
            </View>
            <View style = {{flex : 1, width : "100%", justifyContent : "flex-start", margin : 10}}>
                <Text style = {styles.subtitle} > Full Name</Text>
                <TextInput style = {styles.form}
                value={name}
                onChangeText={(v) => (setName(v))}></TextInput>
            </View>
            <View style = {{flex : 1, width : "100%", justifyContent : "flex-start", margin : 10}}>
                <Text style = {styles.subtitle} > Email</Text>
                <TextInput style = {styles.form}
                value={email}
                onChangeText={(v) => (setEmail(v))}></TextInput>
            </View>
            <View style = {{flex : 1, width : "100%", justifyContent : "flex-start", margin : 10}}>
                <Text style = {styles.subtitle} > Phone</Text>  
                <TextInput style = {styles.form}
                value={phone}
                onChangeText={(v) => (setPhone(v))}></TextInput>
            </View>
            <View style = {{flex : 1, width : "100%" , justifyContent : "flex-start", margin : 10}}>
                <Text style = {styles.subtitle} > Password</Text>
                <View style = {{height : 60, width : "100%", borderRadius : 20,borderColor : "grey", padding : 10, borderWidth : 2, flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}> 
                    <TextInput style = {{        height : 60, 
                    width : "90%", 
                    backgroundColor : "transparent", 
                    borderWidth : 0,
                    fontSize : 20,}}
                    value={password}
                    onChangeText={(v) => (setPassword(v))}
                    secureTextEntry = {hidePassword}></TextInput>
                    <Pressable onPress={() => {setHidePassword(!hidePassword)}} style={{flex : 1}}>
                    <Image source={require("@/assets/eye.png")} style ={{flex : 1}}></Image>
                    </Pressable>
                </View>
            </View>
            <View style = {{flex : 1, width : "100%", alignItems : "center"}}>
                <Text style = {styles.subtitle} >Logout</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        // flexDirection: 'row',
        width: Dimensions.get("window").width , //for full screen
        height: Dimensions.get("window").height, //for full screen
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        position : "relative",
        paddingHorizontal : 20
      },
    subtitle : {
        fontSize : 18,
        fontWeight : "bold",
        flex : 1
    }, 
    form : {
        height : 60, 
        width : "100%", 
        backgroundColor : "transparent", 
        borderWidth : 2,
        fontSize : 20,
        borderColor : "grey",
        borderRadius : 20,
        padding : 10
    }
})