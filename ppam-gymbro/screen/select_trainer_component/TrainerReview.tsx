import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface TrainerReviewProps {
    trainer_id : string
    trainerName: string
}

const TrainerReview: React.FC<TrainerReviewProps> = ({trainerName, trainer_id }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingPress = (index) => {
    setRating(index + 1);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        const source = i < rating ? "star_filled" : "@star_unfilled";
        let imageSource;
        if (source === "star_filled") {
          imageSource = require(`@/assets/icons/star_filled.png`);
        } else {
          imageSource = require(`@/assets/icons/star_unfilled.png`);
        }
        
        stars.push(
          <TouchableOpacity
            key={i}
            onPress={() => handleRatingPress(i)}
            style={styles.starContainer}
          >
            <Image
              style={{ width: screenWidth * (26 / 360), height: screenWidth * (26 / 360) }}
              source={imageSource}
            />
          </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
        <View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableOpacity>
                    <Image style= {{width : screenWidth * (24/360), height : screenWidth * (24/360), }} source={require("@/assets/icons/x.png")}/> 
                </TouchableOpacity>
            </View>
            <View style={{ gap: 5, marginVertical: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>
                    {trainerName}
                </Text>
                <View style={{ height: 2, width: '100%', backgroundColor: '#E1E1E1' }}/>
            </View>
            <View style={{ gap: 10, marginTop: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#444444' }}>
                    Rating
                </Text>
                <View style={styles.ratingContainer}>{renderStars()}</View>
            </View>
            <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#444444' }}>
                    Comment
                </Text>
                <TextInput
                    style={styles.reviewInput}
                    multiline
                    numberOfLines={4}
                    placeholder="Write a comment..."
                    value={review}
                    onChangeText={setReview}
                />
            </View>
        </View>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <TouchableOpacity>
                <View style={{ justifyContent:'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#FF7D40', width: screenWidth * (110/360), height: screenWidth * (50/360)}}>
                    <Text style={{ fontWeight: 'bold', color: '#FEFEFE', fontSize: 16 }}>
                        Submit
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: screenWidth * (20/360),
    width: screenWidth * (320/360),
    height: screenWidth * (480/360),
    borderWidth: 2,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: '#FEFEFE'

  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
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