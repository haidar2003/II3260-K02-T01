import { StyleSheet, Text, TextInput, View, Dimensions, } from 'react-native';
import * as Progress from 'react-native-progress';


export default function LoadingScreen() {

    return (
        <View style={styles.layout}>
            <View style = {{width : "40%", height : "40%", alignItems : "center", justifyContent : "center"}}>
                <Progress.Circle size={Dimensions.get("window").width * 0.3} indeterminate={true}  />
                <Text style = {{margin : 10}}> Loading....</Text>
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
        justifyContent: 'center',
        backgroundColor: 'white',
        position : "relative"
      }
})