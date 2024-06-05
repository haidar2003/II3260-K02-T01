import { StyleSheet, Text, TextInput, View, Image, ScrollView, Dimensions, Pressable} from 'react-native';
import React, {useState} from 'react';
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function Profile() {

    const [user, setUser] = useState({
        userFullName: 'Arnold S.',
        username: 'terminator',
        userEmail: "TerminatorInbox@email.com",
        userPhone: "18004686287",
        userPassword: 'beback',
        userBirthdate: '17th August 2003'
        }
    )

    const [name, setName] = useState("Arnold S.")
    const [email, setEmail] = useState("TerminatorInbox@email.com")
    const [phone, setPhone] = useState("18004686287")
    const [password, setPassword] = useState("")
    const [hidePassword, setHidePassword] = useState(true)
    
    return (
        <View style={styles.layout}>
            <ScrollView style = {{flex : 1}}>
                <View style={{ width: '100%', marginTop: screenWidth * (35/360),  paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (5/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Link href="/(tabs)/workout" asChild>
                        <Pressable> 
                        <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                        </View>
                        </Pressable>
                    </Link>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
                        Profile
                        </Text>
                    </View>
                    <Link href="/(tabs)/workout" asChild>
                        <Pressable> 
                        <View style={{ height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                        </View>
                        </Pressable>
                    </Link>
                </View>

                <View style={{ alignItems: 'center', gap: 10, marginBottom: screenWidth * (20/360) }}>
                    <View style={{ width: screenWidth * (120/360), height: screenWidth * (120/360), borderRadius: 120, backgroundColor: 'grey', justifyContent:'center', alignItems: 'center' }}>
                        
                        <View style={{ marginTop:80, marginLeft:80,width: screenWidth * (40/360), height: screenWidth * (40/360), borderRadius: 120, borderWidth: 5, borderColor: '#FEFEFE', backgroundColor: '#FF7D40' }}/>
                    </View>
                    <View style={{ alignItems: 'center', gap: 0 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold'}}>{user.userFullName}</Text>
                        <Text style={{ fontSize: 16,  }}>@{user.username}</Text>
                        <Text style={{ fontSize: 12, color: '#8F8F8F', lineHeight: 30}}>{user.userBirthdate}</Text>
                    </View>
                </View>

                <View style={{ gap: 10, marginVertical: 10 }}>
                    <Text style={{ color: '#444444', fontWeight: 'bold', fontSize: 16 }}>
                        Full Name
                    </Text>
                    <View style={{ width: screenWidth * (314/360), height: screenWidth * (56/360), borderWidth: 2, borderColor: '#E1E1E1', borderRadius: 12 }}>

                    </View>
                </View>

                <View style={{ gap: 10, marginVertical: 10 }}>
                    <Text style={{ color: '#444444', fontWeight: 'bold', fontSize: 16 }}>
                        Email
                    </Text>
                    <View style={{ width: screenWidth * (314/360), height: screenWidth * (56/360), borderWidth: 2, borderColor: '#E1E1E1', borderRadius: 12 }}>

                    </View>
                </View>

                <View style={{ gap: 10, marginVertical: 10 }}>
                    <Text style={{ color: '#444444', fontWeight: 'bold', fontSize: 16 }}>
                        Phone
                    </Text>
                    <View style={{ width: screenWidth * (314/360), height: screenWidth * (56/360), borderWidth: 2, borderColor: '#E1E1E1', borderRadius: 12 }}>

                    </View>
                </View>

                <View style={{ gap: 10, marginVertical: 10 }}>
                    <Text style={{ color: '#444444', fontWeight: 'bold', fontSize: 16 }}>
                        Password
                    </Text>
                    <View style={{ width: screenWidth * (314/360), height: screenWidth * (56/360), borderWidth: 2, borderColor: '#E1E1E1', borderRadius: 12 }}>

                    </View>
                </View>

                <View style={{ width: screenWidth * (300/360), height: screenWidth * (56/360), alignItems: 'center', borderWidth: 2, justifyContent: 'center', borderColor: '#FF7D40', borderRadius: 12, marginTop: 150, marginBottom: 30 }}>
                    <Text style={{ color: '#FF7D40', fontWeight: 'bold', fontSize: 16 }}>
                        Password
                    </Text>
                </View>

                


            </ScrollView>
        </View>

        // <View style={styles.layout}>
        //     <View style = {{flex : 1.5, width : "100%", justifyContent : "flex-end"}}>
        //         <View style = {{flex : 1}}></View>
        //         <View style = {{flex : 1, width : "100%", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
        //             <Link href={"/(tabs)/home"} asChild>
        //             <Pressable>
        //             <Text style={{fontSize : 20, fontWeight : "bold"}}> Back </Text>
        //             </Pressable>
        //             </Link>
        //             <Text style={{fontSize : 24, fontWeight : "bold"}}> Profile </Text>
        //             <Text style={{fontSize : 20, fontWeight : "bold"}}> Save </Text>
        //         </View>
        //     </View>
        //     <View style = {{flex : 2, width : "100%", justifyContent : "flex-start", alignItems : "center", padding : 10}}>
        //         <Image style = {{flex : 2, aspectRatio : 1, borderRadius : 1000, margin : 10}} source={require("@/assets/profile_picture_placeholder.jpg")}/>
        //         <Text style = {{flex : 0.5, fontSize : 20, fontWeight : "bold"}}>Arnold Schwarzenegger</Text>
        //         <Text style = {{flex : 0.5 , fontSize : 16, fontWeight : "400"}}>@Terminator</Text>
        //         <Text style = {{flex : 0.5 , fontSize : 16, fontWeight : "400"}}>17th August 2023</Text>
        //     </View>
        //     <View style = {{flex : 1, width : "100%", justifyContent : "flex-start", margin : 10}}>
        //         <Text style = {styles.subtitle} > Full Name</Text>
        //         <TextInput style = {styles.form}
        //         value={name}
        //         onChangeText={(v) => (setName(v))}></TextInput>
        //     </View>
        //     <View style = {{flex : 1, width : "100%", justifyContent : "flex-start", margin : 10}}>
        //         <Text style = {styles.subtitle} > Email</Text>
        //         <TextInput style = {styles.form}
        //         value={email}
        //         onChangeText={(v) => (setEmail(v))}></TextInput>
        //     </View>
        //     <View style = {{flex : 1, width : "100%", justifyContent : "flex-start", margin : 10}}>
        //         <Text style = {styles.subtitle} > Phone</Text>  
        //         <TextInput style = {styles.form}
        //         value={phone}
        //         onChangeText={(v) => (setPhone(v))}></TextInput>
        //     </View>
        //     <View style = {{flex : 1, width : "100%" , justifyContent : "flex-start", margin : 10}}>
        //         <Text style = {styles.subtitle} > Password</Text>
        //         <View style = {{height : 60, width : "100%", borderRadius : 20,borderColor : "grey", padding : 10, borderWidth : 2, flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}> 
        //             <TextInput style = {{        height : 60, 
        //             width : "90%", 
        //             backgroundColor : "transparent", 
        //             borderWidth : 0,
        //             fontSize : 20,}}
        //             value={password}
        //             onChangeText={(v) => (setPassword(v))}
        //             secureTextEntry = {hidePassword}></TextInput>
        //             <Pressable onPress={() => {setHidePassword(!hidePassword)}} style={{flex : 1}}>
        //             <Image source={require("@/assets/eye.png")} style ={{flex : 1}}></Image>
        //             </Pressable>
        //         </View>
        //     </View>
        //     <View style = {{flex : 1, width : "100%", alignItems : "center"}}>
        //         <Text style = {styles.subtitle} >Logout</Text>
        //     </View>
        // </View>
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