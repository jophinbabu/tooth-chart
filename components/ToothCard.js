import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getToothImage } from './toothImages'; // Adjust path if needed


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
    marginHorizontal: 7,
    marginVertical: 1,
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 55,
    height: 55,
    marginBottom: 6,
  },
  id: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ToothCard;
