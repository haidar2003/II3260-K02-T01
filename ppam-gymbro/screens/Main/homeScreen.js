import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.layout}>

      <Header username="Kean"/>

      <Box text="Find Trainers"/>
      <Box text="Current Trainers"/>
      <Box text="Workout Plan"/>
      <StatusBar style="auto" />
    </View>
  );
}

 const Box = (props) => {
  return(
    <View style={[styles.box, styles.boxElevation]}>
      <Text style={styles.boxFont}>{props.text}</Text>
    </View>
  );
}

const Header = (props) => {
  return(
    <View style={styles.header}>
      <Text style={styles.headerFont}>Welcome to GymBro! {props.username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f4dfb9',
    alignItems: 'center',
    justifyContent: 'center',
  },

    // headerLayout Gk dipake
  headerLayout: {
    flex: 1,
    height: '10%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#f4dfb9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    height: '20%',
    width: '90%',
    backgroundColor: 'black',
    margin: 12,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerFont: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'left',
    color: '#f4dfb9',
  },

  box: {
    height: '12%',
    width: '80%',
    backgroundColor: 'white',
    margin: 12,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxFont: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center'
  },

  boxElevation: {
    elevation: 15,
    shadowColor: '#black',
  },

});
