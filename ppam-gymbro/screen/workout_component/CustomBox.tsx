import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

interface CustomBoxProps {
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    type?: 'free-plan' | 'trainer-plan';
    location?: 'main-home' | 'main-workout' | 'trainer-menu' | 'free-menu' | 'free-menu-selection';
    isOver?: boolean;
    isSelected?: boolean;
    isAdded?: boolean;
    name?: string;
}

const screenWidth = Dimensions.get('window').width;
  
const CustomBox: React.FC<CustomBoxProps> = ({ name, location, difficulty, isSelected, isOver, isAdded}) => {
    const [isAdding, setIsAdding] = useState(isAdded);
    
    // Style
    let containerStyle, buttonColor;

    if (isAdding) {
      buttonColor = '#FF7D40'
    } else {
      buttonColor = '#FEFEFE'
    }

    if (location) {
      if (location === 'main-home') {
        containerStyle = styles.mainHome
      }
      else if (location === 'main-workout') {
        containerStyle = styles.mainWorkout
      }
      else if (location === 'trainer-menu') {
        if (isOver) {
          containerStyle = styles.trainerMenuOver
        } else {
          containerStyle = styles.trainerMenu
        }
      }
      else if (location === 'free-menu') {
        if (isSelected){
          containerStyle = styles.freeMenuSelected
        } 
        else {
          containerStyle = styles.freeMenu
        }
      }
      else if (location === 'free-menu-selection') {
        if (isSelected){
          if (isAdded) {
            containerStyle = styles.freeMenuSelectionSelectedAdded
          } else {
            containerStyle = styles.freeMenuSelectionSelected
          }
        } 
        else {
          if (isAdded) {
            containerStyle = styles.freeMenuSelectionAdded
          } else {
            containerStyle = styles.freeMenuSelection
          }
        }
      }
    }
    

    return (
      <View style={containerStyle}>
        {/* Top */}
        <View style={styles.topContainer}> 
          {/* Left Section */}
          <View style={styles.leftSection}>
            <View style={styles.circle} >
              {/* Image */}
            </View>
          </View>
    
          {/* Right Section with Text and Progress Bar */}
          <View style={styles.rightSection}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>{name}</Text>
            <View style={styles.difficultyContainer}>
              {difficulty && ( 
                <Text style={styles.textSmall}>
                  {difficulty === 'Beginner' && 1}
                  {difficulty === 'Intermediate' && 2}
                  {difficulty === 'Advanced' && 3}
                  {difficulty === 'Expert' && 4}
                </Text>
              )}
              <Text style={styles.textSmall}>{difficulty}</Text>
            </View>
            {((location === 'trainer-menu') && isOver) ? 
            (<View style={styles.progressContainer}>
              <Text>Clock</Text>
              <Text>A month ago</Text>
            </View>) : 
            // Line 92
            (<View style={styles.progressContainer}> 
              <Progress.Bar borderWidth={0} unfilledColor='#FDE4D3' progress={0.3} width={screenWidth * (140/360)} color='#FF7D40'/>
              {(100 === 100) ? 
              (<Text style={{fontSize: 12, marginLeft: 18, marginBottom: 5 }}>{Math.round(30)}%</Text>) : 
              (<Text style={styles.textSmall}>Finished</Text>)}
            </View>) }
            {/* <View style={styles.progressContainer}>
              <Progress.Bar progress={0.3} width={140} />
              {(100 === 100) ? (<Text style={styles.textSmall}>{Math.round(30)}%</Text>) : (<Text style={styles.textSmall}>Finished</Text>)};
            </View> */}
          </View>
        </View>

        {/* Bottom */}
        {(location === 'main-home') && ( 
          <View style={styles.continueWorkout}>
            
          </View>
        )}

        {isSelected && ( 
          <View>
            {location === 'free-menu' && (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={{ borderWidth: 2.5, borderColor: '#FF7D40', backgroundColor: '#FF7D40', height: screenWidth * (40/360), width: screenWidth * (135/360), borderRadius: 12, justifyContent: 'center' , alignItems: 'center'}}>
                  <Text style={{color: '#FEFEFE', fontWeight: 'bold'}}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth: 2.5, borderColor: '#FF7D40', backgroundColor: '#FF7D40', height: screenWidth * (40/360), width: screenWidth * (135/360), borderRadius: 12, justifyContent: 'center' , alignItems: 'center'}}>
                  <Text style={{color: '#FEFEFE', fontWeight: 'bold'}}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}
            {location === 'free-menu-selection' && (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={{ borderWidth: 2.5, borderColor: '#FF7D40', backgroundColor: buttonColor, height: screenWidth * (40/360), width: screenWidth * (135/360), borderRadius: 12, justifyContent: 'center' , alignItems: 'center'}}>
                  {isAdding ? (<Text style={{color: '#FEFEFE', fontWeight: 'bold'}}>Remove</Text>) : (<Text style={{color: '#FF7D40', fontWeight: 'bold'}}>Add</Text>)}
                </TouchableOpacity>
                <TouchableOpacity style={{ height: screenWidth * (40/360), width: screenWidth * (135/360), borderRadius: 12, justifyContent: 'center' , alignItems: 'center'}}>
                  <Text style={{color: '#FF7D40', fontWeight: 'bold'}}>See Details</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  mainHome: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: screenWidth * (320/360),
    height: screenWidth * (185/360),
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  mainWorkout: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: screenWidth * (320/360),
    height: screenWidth * (110/360),
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  trainerMenu: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: screenWidth * (320/360),
    height: screenWidth * (110/360),
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  trainerMenuOver: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: screenWidth * (320/360),
    height: screenWidth * (110/360),
    borderRadius: 24,
    backgroundColor: '#EEEEEE'

  },
  freeMenu: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: screenWidth * (320/360),
    height: screenWidth * (110/360),
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  freeMenuSelected: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: screenWidth * (320/360),
    height: screenWidth * (170/360),
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  freeMenuSelection: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: screenWidth * (320/360),
    height: screenWidth * (110/360),
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: '#E1E1E1',
    backgroundColor: '#FEFEFE',

  },
  freeMenuSelectionAdded: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: screenWidth * (320/360),
    height: screenWidth * (110/360),
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  freeMenuSelectionSelected: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: screenWidth * (320/360),
    height: screenWidth * (170/360),
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: '#E1E1E1',
    backgroundColor: '#FEFEFE',

  },
  freeMenuSelectionSelectedAdded: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: screenWidth * (320/360),
    height: screenWidth * (170/360),
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: screenWidth * (80/360),
    width: screenWidth * (280/360),
    gap: 25,
  },

  continueWorkout: {
    marginTop: 10,
    width: screenWidth * (280/360),
    height: screenWidth * (60/360),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
    borderRadius: 24,
  },
  
  buttonsContainer: {
    marginTop: 15,
    width: screenWidth * (280/360),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },

  leftSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    justifyContent: 'center',
    gap: 10
  },
  text: {
    fontSize: 16,
  },
  textSmall: {
    fontSize: 12,
  },
  difficultyContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 5
    
  },
  circle: {
    width: 62,
    height: 62,
    borderRadius: 36, 
    backgroundColor: '#FF7D40',
  },
  progressContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12
  },
});

export default CustomBox;