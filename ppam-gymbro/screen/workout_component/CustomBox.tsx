import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Progress from 'react-native-progress';


interface CustomBoxProps {
    difficulty?: 'easy' | 'medium' | 'hard' | 'expert'; 
    type?: 'free-plan' | 'trainer-plan';
    location?: 'main-home' | 'main-workout' | 'trainer-menu' | 'free-menu' | 'free-menu-selection';
    isOver?: boolean;
    isSelected?: boolean;
    isAdded?: boolean;
  }
  
  const CustomBox: React.FC<CustomBoxProps> = ({ location, difficulty, isSelected, isOver, isAdded}) => {
    const [isAdding, setIsAdding] = useState(isAdded);
    
    // Style
    let containerStyle;

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
            <Text style={styles.text}>Title</Text>
            <View style={styles.difficultyContainer}>
              {difficulty && ( 
                <Text style={styles.textSmall}>
                  {difficulty === 'easy' && 1}
                  {difficulty === 'medium' && 2}
                  {difficulty === 'hard' && 3}
                  {difficulty === 'expert' && 4}
                </Text>
              )}
              <Text style={styles.textSmall}>Text 2</Text>
            </View>
            {((location === 'trainer-menu') && isOver) ? 
            (<View style={styles.progressContainer}>
              <Text>Clock</Text>
              <Text>A month ago</Text>
            </View>) : 
            // Line 92
            (<View style={styles.progressContainer}> 
              <Progress.Bar progress={0.3} width={140} color='orange'/>
              {(100 === 100) ? 
              (<Text style={styles.textSmall}>{Math.round(30)}%</Text>) : 
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
                <Button
                  title="Remove"
                  color="orange"
                />
                <Button
                  title="Continue"
                  color="orange"
                />
              </View>
            )}
            {location === 'free-menu-selection' && (
              <View style={styles.buttonsContainer}>
                <Button title={isAdding ? 'Add' : 'Remove'} />
                <Button
                  title="See Details"
                  color="orange"
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  mainHome: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    height: 185,
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  mainWorkout: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    height: 110,
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  trainerMenu: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    height: 110,
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  trainerMenuOver: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    height: 110,
    borderRadius: 24,
    backgroundColor: '#ECECEC'

  },
  freeMenu: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    height: 110,
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  freeMenuSelected: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    height: 170,
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  freeMenuSelection: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    height: 110,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',

  },
  freeMenuSelectionAdded: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    height: 110,
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },
  freeMenuSelectionSelected: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    height: 170,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',

  },
  freeMenuSelectionSelectedAdded: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    height: 170,
    borderRadius: 24,
    backgroundColor: '#FFEAD9'

  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  continueWorkout: {
    width: 280,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
  },
  
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  leftSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    flex: 2,
    justifyContent: 'space-between', 
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  textSmall: {
    fontSize: 12,
    marginLeft: 10
  },
  difficultyContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10,
    
  },
  circle: {
    width: 62,
    height: 62,
    borderRadius: 36, 
    backgroundColor: 'orange',
    margin: 22,
  },
  progressContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
});

export default CustomBox;