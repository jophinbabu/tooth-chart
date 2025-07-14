import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';

// Static image loader based on tooth ID
const getToothImage = (toothId) => {
  const images = {
    UR8: require('../assets/images/UR8.png'),
    // Add more like:
    // UL1: require('../assets/images/UL1.png'),
    // LR1: require('../assets/images/LR1.png'),
  };
  return images[toothId] || null;
};

const ToothDetailModal = ({ visible, tooth, onClose, onUpdate }) => {
  const [details, setDetails] = useState('');
  const [defects, setDefects] = useState('');

  useEffect(() => {
    if (tooth) {
      setDetails(tooth.details || '');
      setDefects((tooth.defect || []).join(', '));
    }
  }, [tooth]);

  if (!tooth) return null;

  const handleSave = () => {
    const updatedTooth = {
      ...tooth,
      details,
      defect: defects
        .split(',')
        .map((d) => d.trim())
        .filter((d) => d.length > 0),
    };
    onUpdate(updatedTooth);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContent}>
        <Text style={styles.title}>{tooth.name}</Text>

        {getToothImage(tooth.id) ? (
          <Image source={getToothImage(tooth.id)} style={styles.image} />
        ) : (
          <Text style={styles.noImage}>No image available</Text>
        )}

        <Text style={styles.label}>Defects (comma separated):</Text>
        <TextInput
          value={defects}
          onChangeText={setDefects}
          style={styles.input}
          placeholder="e.g. cavity, root canal"
        />

        <Text style={styles.label}>Details:</Text>
        <TextInput
          value={details}
          onChangeText={setDetails}
          style={[styles.input, { height: 80 }]}
          multiline
          placeholder="Add details about the tooth..."
        />

        <View style={styles.buttonRow}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Close" onPress={onClose} color="gray" />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    resizeMode: 'contain',
  },
  noImage: {
    marginVertical: 20,
    textAlign: 'center',
    color: 'gray',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ToothDetailModal;
