import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';


interface CustomBoxProps {
    difficulty?: 'easy' | 'medium' | 'hard' | 'expert'; // Optional difficulty prop
  }
  
  const CustomBox: React.FC<CustomBoxProps> = ({ difficulty }) => {
    return (
      <View style={styles.workoutContainer}>
        {/* Left Section with Circle */}
        <View style={styles.leftSection}>
          <View style={styles.circle} />
        </View>
  
        {/* Right Section with Text and Progress Bar */}
        <View style={styles.rightSection}>
          <Text style={styles.text}>Title</Text>
          <View style={styles.difficultyContainer}>
            {difficulty && ( // Render difficulty text only if difficulty prop exists
              <Text style={styles.textSmall}>
                {difficulty === 'easy' && 1}
                {difficulty === 'medium' && 2}
                {difficulty === 'hard' && 3}
                {difficulty === 'expert' && 4}
              </Text>
            )}
            <Text style={styles.textSmall}>Text 2</Text>
          </View>
          <View style={styles.progressContainer}>
            <Progress.Bar progress={0.3} width={140} />
            <Text style={styles.textSmall}>{Math.round(30)}%</Text>
          </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  workoutContainer: {
    backgroundColor: 'white',
    borderRadius: 36,
    width: 320,
    height: 110,
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
    justifyContent: 'space-between', // Vertically spaced elements
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
    flexDirection: 'row', // Arrange progress bar and text side-by-side
    alignItems: 'center', // Vertically align text and progress bar
    marginVertical: 14,
    
  },
  circle: {
    width: 62,
    height: 62,
    borderRadius: 36, // Half width/height for circle
    backgroundColor: 'orange',
    margin: 22,
  },
  progressContainer: {
    flexDirection: 'row', // Arrange progress bar and text side-by-side
    alignItems: 'center', // Vertically align text and progress bar
  },
});

export default CustomBox;