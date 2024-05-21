import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressCircle from "react-native-progress-circle"; // Import for Progress Bar


interface CustomBoxProps {
    difficulty?: 'easy' | 'medium' | 'hard' | 'expert'; // Optional difficulty prop
  }
  
  const CustomBox: React.FC<CustomBoxProps> = ({ difficulty }) => {
    return (
      <View style={styles.container}>
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
            <ProgressCircle
              percent={30} // Adjust progress as needed
              radius={30}
              borderWidth={8}
              color="#f00" // Progress bar color
              shadowColor="#ddd"
              bgColor="#fff"
            />
            <Text style={styles.textSmall}>{Math.round(30)}%{/* Display percentage value */}</Text>
          </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightorange',
    borderRadius: 24,
    width: 320,
    height: 110,
    flexDirection: 'row',
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
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20, // Half width/height for circle
    backgroundColor: 'lightgray',
  },
  progressContainer: {
    flexDirection: 'row', // Arrange progress bar and text side-by-side
    alignItems: 'center', // Vertically align text and progress bar
  },
});

export default CustomBox;
