import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getToothImage } from './toothImages'; // Adjust path if needed


const ToothCard = ({ tooth, onPress }) => {
  const imageSource = getToothImage(tooth.photo); //a


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
    // Removed backgroundColor, elevation, borderRadius, and padding
    marginHorizontal: 0,
    marginVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  image: {
    width: 25,
    height: 55,
    marginBottom: 6,
  },
  id: {
    fontWeight: '900',
    fontSize: 16,
  },
});

export default ToothCard;