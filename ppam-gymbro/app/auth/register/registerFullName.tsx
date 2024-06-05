import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Button, TouchableOpacity} from 'react-native';
import { Link, router } from 'expo-router';
import { Image } from 'expo-image';
import { Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRegister } from '@/provider/RegisterProvider';
import { supabase } from '@/utils/supabase';

export default function register_fullName() {
  // const [text, onChangeText] = React.useState('');
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [date, setDate] = React.useState(new Date()); // Default Date Value of Today
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const today = React.useState(new Date().getFullYear())
  const {register, setUsernameAndEmail, setPassword} = useRegister();

  const onChange = (event, selectedDate) => {
    if (selectedDate){
      setDate(selectedDate)
    }
    setShowDatePicker(false)
  }

  const [fullName, setFullName] = React.useState("")
  const isButtonEnabled = fullName.length > 0

  const handlePress = async () => {
    console.log(register.password)
    const { data, error } = await supabase.auth.signUp({
      email: register.email,
      password: register.password,
    })
    if (error) {
      console.log(error)
    } else {
      const {error } = await supabase
      .from('User')
      .insert(
        { id_user: data.user.id, username: register.username, nama_user : date , DoB : fullName},
      )
      if (error) {
        console.log(error)
      }  else {
        router.replace("/(tabs)/home/")
      }
       
    }
  }
  return (
    <View style={styles.layout}>
      <ScrollView contentContainerStyle={styles.scrollLayout}>
        {/* View yang isinya logo + welcome back */}
          <View style={styles.LogoSpace}>
            <Text style={styles.titleNotBold}>Start Your</Text>
            <Text style={styles.title}>Workout Journey</Text>
          </View>
          
          {/* View yang isinya input full name, DoB, dan agreement */}
          <View style={styles.InputSpace}>
            <TextInput
              style={styles.InputBox}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />

            {/* Date of Birth Selector */}
            <View style={styles.DatePickerContainer}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.subtextBoldBlack}>Date of Birth: {date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {
                showDatePicker && (
                  <DateTimePicker 
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
              )}
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={termsAccepted ? 'checked' : 'unchecked'}
                color = "white"
                onPress={() => {
                  setTermsAccepted(!termsAccepted);
                }}
              />
              <Text style={styles.checkboxLabel}>I have read and agreed to GymBro's Terms and Conditions </Text>
            </View>
          </View>
          
          {/* View yang isinya tombol log in */}
          <View style={styles.LowerThird}>
            <Text style={styles.subtext}>Already have an account? <Link href="../login/" style={styles.subtextBold}>Log In</Link></Text>
            {
              isButtonEnabled?(
                <TouchableOpacity onPress={handlePress} style={styles.WhiteButton}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              ): (
                <View style={styles.disabledWhiteButton}>
                  <Text style={styles.disabledButtonText}>Register</Text>
                </View>
              )
            }
            
          </View>
        
      </ScrollView> 

      <ImageBackground 
        source={require("../../../assets/Landing - Login.png")} 
        style={[styles.fixed, styles.imageBackgroundContainer, {zIndex: -1}]}
      />
    </View>
    
  )
}

const image = "ppam-gymbro\assets\Landing - Login.png"

const WhiteButton = (props) => {
  return(
    <View style={[styles.WhiteButton, styles.WhiteButtonElevation]}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get("window").width , //for full screen
    height: Dimensions.get("window").height, //for full screen
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  scrollLayout:{
    flex: 1,
    height: '100%',
    width: '100%',
  },

  imageBackgroundContainer: {
    width: Dimensions.get("window").width * 1.08, //for full screen
    // height: Dimensions.get("window").height //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: -8,
    right: 0,
    bottom: 0
  },

  imageBackground: {
    flex: 1,
    // height: "100%",
    // width: "100%",
    position: 'absolute',
    resizeMode : "stretch"
  },

  LogoSpace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 144
  },

  logo: {
    height: 109,
    width: 109,
  },

  title:{
    fontWeight: 'bold',
    fontSize: 42,
    textAlign: 'center',
    color: 'white',
  },

  titleNotBold:{
    fontSize: 42,
    textAlign: 'center',
    color: 'white',
  },

  InputSpace:{
    flex: 2,
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0
  },

  InputBox:{
    height: 65,
    width: "80%",
    margin: 6,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "white",
    padding: 4,
    paddingLeft: 21,
    backgroundColor: "white"
  },

  subtext:{
    fontSize: 16,
    textAlign: "center",
    color: "white"
  },

  subtextBold:{
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },

  subtextBoldBlack:{
    fontSize: 16,
    textAlign: "center",
    color: "black",
    fontWeight: "bold"
  },

  label:{
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },

  LowerThird:{
    // paddingVertical: 30,
    // position: 'absolute',
    // bottom: 0,
    flex: 1,
    width: "100%",
    height: '20%',
    alignItems: "center",
    justifyContent: "center",
  },

  WhiteButton:{
    marginTop:4,
    height: 65,
    width: "80%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "white",
    backgroundColor: "white",
    padding: 4,
    paddingTop: 16,
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  },

  disabledWhiteButton: {
    marginTop:4,
    height: 65,
    width: "80%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "white",
    backgroundColor: "white",
    padding: 4,
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  },
  WhiteButtonElevation:{
    elevation: 15,
    shadowColor: '#black',
  },

  buttonText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },

  disabledButtonText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },

  checkboxContainer: {
    width: "75%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  checkboxLabel: {
    fontSize: 16,
    color: 'white',
    marginLeft: 8,
    textAlign: "left",
    fontWeight: "bold",
  },

  DatePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    width: "80%",
    margin: 6,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "white",
    padding: 4,
    paddingLeft: 21,
    backgroundColor: "white"
  },
  DatePickerLabel: {
    color: 'black',
    fontSize: 16,
    marginRight: 8,
  },

  

});