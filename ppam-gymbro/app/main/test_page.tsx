import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from "expo-router"
import CustomBox from "@/screen/workout_component/CustomBox";
export default function HomeScreen() {
  return (
    <View style={styles.layout}>
      <CustomBox difficulty='easy'/>
    </View>
  );
}


const styles = StyleSheet.create({
  layout: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#f4dfb9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
