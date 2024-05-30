import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface NavbarProps {
    location?: 'home' | 'trainer-search' | 'trainer-select' | 'workout' | 'chat',
  }
  
const Navbar: React.FC<NavbarProps> = ({ location }) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.childContainer}>
            {(location === 'trainer-search') ? (
                <Text style={{fontWeight: 'bold'}}>Find</Text>
            ) : (
                <View style={{width: 20, height: 20, backgroundColor: 'grey'}}/>
            )}
        </View>
        <View style={styles.childContainer}>
            {(location === 'trainer-select') ? (
                <Text style={{fontWeight: 'bold'}}>Trainer</Text>
            ) : (
                <View style={{width: 20, height: 20, backgroundColor: 'grey'}}/>
            )}
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',width: screenWidth * 0.16, height: screenWidth * 0.29,}}>
            <View style={styles.circle}>
            <View style={{width: 20, height: 20, backgroundColor: 'white'}}/>
            </View>
        </View>
        <View style={styles.childContainer}>
            {(location === 'workout') ? (
                <Text style={{fontWeight: 'bold'}}>Plan</Text>
            ) : (
                <View style={{width: 20, height: 20, backgroundColor: 'grey'}}/>
            )}
        </View>
        <View style={styles.childContainer}>
            {(location === 'chat') ? (
                <Text style={{fontWeight: 'bold'}}>Chat</Text>
            ) : (
                <View style={{width: 20, height: 20, backgroundColor: 'grey'}}/>
            )}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    circle: {
        width: screenWidth * 0.17,
        height: screenWidth * 0.17,
        borderRadius: 100, 
        backgroundColor: '#FF7D40',
        justifyContent: 'center',
        alignItems: 'center'
    },
    childContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth * 0.16,
        height: screenWidth * 0.29,
    },
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 15,
        width: screenWidth,
        height: screenWidth * 0.29,
        borderRadius: 40,
        backgroundColor: 'white'
      },
})

export default Navbar;