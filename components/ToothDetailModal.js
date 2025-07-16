import React, { useState, useEffect } from 'react';
import { getToothImage } from './toothImages';
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

const ToothDetailModal = ({ visible, tooth, onClose, onUpdate }) => {
  const [notes, setNotes] = useState('');
  const [defectsInputText, setDefectsInputText] = useState('');


 useEffect(() => {
  if (tooth) {
    setNotes(tooth.details || '');
    setDefectsInputText((tooth.defect || []).join(', '));
  }
}, [tooth]);


  if (!tooth) return null;

  const handleSave = () => {
  const cleanedDefects = defectsInputText
    .split(/[\n,]+/)
    .map(d => d.trim())
    .filter(Boolean);

  const updatedTooth = {
    ...tooth,
    details: notes,
    defect: cleanedDefects,
  };

  onUpdate(updatedTooth);
  onClose();
};


  return (
    <Modal visible={visible} animationType="fade">
      <ScrollView contentContainerStyle={styles.modalContent}>
        <Text style={styles.title}>{tooth.name}</Text>

        {getToothImage(tooth.id) ? (
          <Image source={getToothImage(tooth.id)} style={styles.image} />
        ) : (
          <Text style={styles.noImage}>No image available</Text>
        )}

        <Text style={styles.label}>Defects:</Text>
<TextInput
  style={[styles.input, { height: 80 }]}
  multiline
  placeholder="Enter defects (e.g., Cavity, Fracture)"
  value={defectsInputText}
  onChangeText={setDefectsInputText}
/>


        <Text style={styles.label}>Notes:</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, { height: 80 }]}
          multiline
          placeholder="Add treatment for the tooth..."
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
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  noImage: {
    marginVertical: 20,
    textAlign: 'center',
    color: 'gray',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 14,
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ToothDetailModal;
