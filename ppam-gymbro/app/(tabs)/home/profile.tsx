import { StyleSheet, Text, TextInput, View, Image, ScrollView, Dimensions, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { Link } from 'expo-router';
import { useAuth } from '@/provider/AuthProvider';
import { supabase } from '@/utils/supabase';
import { getImageNumber, referenceUserImage } from '@/utils/getImage';

const screenWidth = Dimensions.get('window').width;

export default function Profile() {
    
    const user = {
        userFullName: 'Arnold S.',
        username: 'terminator',
        userEmail: "TerminatorInbox@email.com",
        userPhone: "18004686287",
        userPassword: 'beback',
        userBirthdate: '17th August 2003'
        }

    const {session,authLoading,userData,getSession,updateUserData,logOut} = useAuth()
    const [name, setName] = useState(userData.nama_user)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [hidePassword, setHidePassword] = useState(true)
    const imageNumber = getImageNumber(userData.nama_user)
    const changeEmail = async () => {
        const { data, error } = await supabase.auth.updateUser({
            email: email
          })
          if (error) {
            console.log("GAGAL GANTI",error)
        }
    }
    
    const changePassword = async () => {
        const { data, error } = await supabase.auth.updateUser({
            password: password
          })
          if (error) {
            console.log("GAGAL GANTI",error)
        }
    }
    const changePhone = async () => {
        const { data, error } = await supabase.auth.updateUser({
            phone: phone
          })
          if (error) {
            console.log("GAGAL GANTI",error)
        }
    }
    const changeName = async () => {
        const { data, error } = await supabase.from("User").update({nama_user : name }).eq("id_user", userData.id_user)
        if (error) {
            console.log("GAGAL GANTI",error)
        }
    }

    return (
        <View style={styles.layout}>
            <ScrollView style = {{flex : 1}}>
                <View style={{ width: '100%', marginTop: screenWidth * (35/360),  paddingVertical: screenWidth * (20/360), paddingHorizontal: screenWidth * (5/360), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Link href="/(tabs)/workout" asChild>
                        <TouchableOpacity>
                            <View style={{ alignItems: 'center', justifyContent:'center', height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                                <Image
                                style = {{ height: 25, width: 25, marginRight: 5 }}
                                source = {require("@/assets/icons/back.png")}
                                />
                            </View>
                        </TouchableOpacity>
                    </Link>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
                        Profile
                        </Text>
                    </View>
                    <Link href="/(tabs)/workout" asChild>
                        <TouchableOpacity>
                            <View style={{ alignItems: 'center', justifyContent:'center', height: screenWidth * (56/360), width: screenWidth * (56/360), borderWidth: 2, borderRadius: 50, borderColor: '#E1E1E1'}}>
                                <Image
                                style = {{ height: 25, width: 25}}
                                source = {require("@/assets/icons/save.png")}
                                />
                            </View>
                        </TouchableOpacity>
                    </Link>
                </View>

                <View style={{ alignItems: 'center', gap: 10, marginBottom: screenWidth * (20/360) }}>
                    <View style={{ width: screenWidth * (120/360), height: screenWidth * (120/360), paddingTop: 119, justifyContent:'center', alignItems: 'center' }}>
                        <Image
                            style = {{ marginVertical: -120,width: screenWidth * (120/360), height: screenWidth * (120/360), borderRadius: 120 }}
                            source = {referenceUserImage[imageNumber]}
                        />
                        <TouchableOpacity>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop:80, marginLeft:80, width: screenWidth * (40/360), height: screenWidth * (40/360), borderRadius: 120, borderWidth: 5, borderColor: '#FEFEFE', backgroundColor: '#FF7D40' }}>
                                <Image
                                    style = {{ height: 18, width: 18}}
                                    source = {require("@/assets/icons/edit.png")}
                                />
                            </View>
                        </TouchableOpacity>
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
                <TextInput
                    style={{ width: screenWidth * (314 / 360), height: screenWidth * (56 / 360), borderWidth: 2, borderColor: '#E1E1E1', borderRadius: 12, paddingHorizontal: 20 }}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={{ gap: 10, marginVertical: 10 }}>
                <Text style={{ color: '#444444', fontWeight: 'bold', fontSize: 16 }}>
                    Email
                </Text>
                <TextInput
                    style={{ width: screenWidth * (314 / 360), height: screenWidth * (56 / 360), borderWidth: 2, borderColor: '#E1E1E1', borderRadius: 12, paddingHorizontal: 20 }}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View style={{ gap: 10, marginVertical: 10 }}>
                <Text style={{ color: '#444444', fontWeight: 'bold', fontSize: 16 }}>
                    Phone
                </Text>
                <TextInput
                    style={{ width: screenWidth * (314 / 360), height: screenWidth * (56 / 360), borderWidth: 2, borderColor: '#E1E1E1', borderRadius: 12, paddingHorizontal: 20 }}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>

            <View style={{ gap: 10, marginVertical: 10 }}>
                <View style={{ width: screenWidth * (314 / 360), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{ color: '#444444', fontWeight: 'bold', fontSize: 16 }}>
                        Password
                    </Text>
                    <TouchableOpacity>
                        <Text style={{ color: '#575757', fontSize: 12 }}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: '#E1E1E1', borderRadius: 12 }}>
                    <TextInput
                        style={{ flex: 1, height: screenWidth * (56 / 360), paddingHorizontal: 20 }}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={hidePassword}
                    />
                    <TouchableOpacity
                        style={{ marginRight: 10, padding: 5 }}
                        onPress={() => setHidePassword(!hidePassword)}
                    >
                        <Image
                            source={hidePassword ? require('@/assets/icons/eye.png') : require('@/assets/icons/eye-off.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

                <TouchableOpacity onPress={()=> {logOut()}}>
                    <View style={{ width: screenWidth * (300/360), height: screenWidth * (56/360), alignItems: 'center', borderWidth: 2, justifyContent: 'center', borderColor: '#FF7D40', borderRadius: 12, marginTop: 150, marginBottom: 30 }}>
                        <Text style={{ color: '#FF7D40', fontWeight: 'bold', fontSize: 16 }}>
                            Logout
                        </Text>
                    </View> 
                </TouchableOpacity>
    
            </ScrollView>
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