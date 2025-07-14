import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Function to return image based on tooth.photo (assuming it's just an ID like "UR8")
const getToothImage = (photoId) => {
  const images = {
    UR8: require('../assets/images/UR8.png'),
    // Add other tooth images as needed:
    // UR7: require('../assets/images/UR7.png'),
    // UL1: require('../assets/images/UL1.png'),
  };
  return images[photoId] || null;
};

const ToothCard = ({ tooth, onPress }) => {
  const imageSource = getToothImage(tooth.photo);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(tooth)}>
      {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      )}
      <Text style={styles.id}>{tooth.id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 100,
    marginHorizontal: 10, // spacing between cards horizontally
    marginVertical: 8,    // spacing vertically
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50, // increased from 40
    height: 50,
    marginBottom: 6,
  },
  id: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ToothCard;
