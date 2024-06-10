import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';

const TrainerReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingPress = (index) => {
    setRating(index + 1);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starColor = i < rating ? '#FFD700' : '#D3D3D3'; // Gold or Gray
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRatingPress(i)}
          style={styles.starContainer}
        >
          <View style={[styles.star, { backgroundColor: starColor }]} />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>{renderStars()}</View>
      <TextInput
        style={styles.reviewInput}
        multiline
        numberOfLines={4}
        placeholder="Write your review..."
        value={review}
        onChangeText={setReview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starContainer: {
    padding: 5,
  },
  star: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  reviewInput: {
    width: 280,
    height: 160,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    padding: 10,
    fontSize: 12,
    textAlignVertical: 'top',
  },
});

export default TrainerReview;