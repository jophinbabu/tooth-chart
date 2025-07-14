import React, { useState, useEffect } from 'react';
import { getToothImage } from './toothImages';
import { DEFECT_OPTIONS } from './defectOptions';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ToothDetailModal = ({ visible, tooth, onClose, onUpdate }) => {
  const [details, setDetails] = useState('');
  const [selectedDefects, setSelectedDefects] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherDefect, setOtherDefect] = useState('');

  useEffect(() => {
    if (tooth) {
      setDetails(tooth.details || '');
      setSelectedDefects(tooth.defect || []);
      // Check if there are any custom defects to show the input
      setShowOtherInput(tooth.defect?.some(d => d.startsWith('Other: ')) || false);
    }
  }, [tooth]);

  if (!tooth) return null;

 const toggleDefect = (defect) => {
  if (defect === 'Other') {
    const isAlreadySelected = selectedDefects.some(d => d.startsWith('Other: '));
    setShowOtherInput(!isAlreadySelected);

    if (isAlreadySelected) {
      setSelectedDefects(prev => prev.filter(d => !d.startsWith('Other: ')));
      setOtherDefect('');
    }
  } else {
    setSelectedDefects((prev) =>
      prev.includes(defect)
        ? prev.filter((d) => d !== defect)
        : [...prev, defect]
    );
  }
};

const handleOtherInputChange = (text) => {
  setOtherDefect(text);
  
  const formatted = `Other: ${text.trim()}`;

  // Add or update Other defect
  setSelectedDefects((prev) => {
    const others = prev.filter(d => !d.startsWith('Other: '));
    return text.trim() ? [...others, formatted] : others;
  });

  if (text.trim()) {
    setShowOtherInput(true);
  } else {
    setShowOtherInput(false);
  }
};


  const handleSave = () => {
    const updatedTooth = {
      ...tooth,
      details,
      defect: selectedDefects,
    };
    onUpdate(updatedTooth);
    onClose();
  };

  // Split defects into two columns (including "Other" option)
  const allOptions = [...DEFECT_OPTIONS, ];
  const midPoint = Math.ceil(allOptions.length / 2);
  const firstColumn = allOptions.slice(0, midPoint);
  const secondColumn = allOptions.slice(midPoint);

  return (
    <Modal visible={visible} animationType="fade">
      <ScrollView contentContainerStyle={styles.modalContent}>
        <Text style={styles.title}>{tooth.name}</Text>

        {getToothImage(tooth.id) ? (
          <Image source={getToothImage(tooth.id)} style={styles.image} />
        ) : (
          <Text style={styles.noImage}>No image available</Text>
        )}

        <Text style={styles.label}>Select Defects:</Text>
        <View style={styles.defectsContainer}>
          <View style={styles.column}>
            {firstColumn.map((defect) => (
              <View key={defect}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => toggleDefect(defect)}
                >
                  <View style={[
                    styles.checkbox,
                    (selectedDefects.includes(defect) || 
                    (defect === 'Other' && (showOtherInput || selectedDefects.some(d => d.startsWith('Other: '))))) && 
                    styles.checkedBox
                  ]}>
                    {(selectedDefects.includes(defect) || 
                     (defect === 'Other' && (showOtherInput || selectedDefects.some(d => d.startsWith('Other: '))))) && 
                     <Text style={styles.checkmark}>✔</Text>}
                  </View>
<Text style={styles.checkboxLabel}>{defect}</Text>
</TouchableOpacity>

{defect === 'Other' && (showOtherInput || selectedDefects.some(d => d.startsWith('Other: '))) && (
<View style={styles.otherInputContainer}>
  <TextInput
    value={otherDefect}
    onChangeText={handleOtherInputChange}
    style={styles.otherInput}
    placeholder="Enter custom defect"
  />
</View>

)}

              </View>
            ))}
          </View>
          <View style={styles.column}>
            {secondColumn.map((defect) => (
              <TouchableOpacity
                key={defect}
                style={styles.checkboxContainer}
                onPress={() => toggleDefect(defect)}
              >
                <View style={[
                  styles.checkbox,
                  selectedDefects.includes(defect) && styles.checkedBox
                ]}>
                  {selectedDefects.includes(defect) && <Text style={styles.checkmark}>✔</Text>}
                </View>
                <Text style={styles.checkboxLabel}>{defect}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Display custom defects that were added */}
        {selectedDefects.some(d => d.startsWith('Other: ')) && (
          <View style={styles.customDefectsContainer}>
            <Text style={styles.customDefectsTitle}>Custom Defects:</Text>
            {selectedDefects
              .filter(d => d.startsWith('Other: '))
              .map((defect, index) => (
                <View key={index} style={styles.customDefectItem}>
                  <Text style={styles.customDefectText}>{defect.replace('Other: ', '')}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedDefects(prev => prev.filter(d => d !== defect));
                      // If no more custom defects, hide the input
                      if (selectedDefects.filter(d => d.startsWith('Other: ')).length === 1) {
                        setShowOtherInput(false);
                      }
                    }}
                  >
                    <Text style={styles.removeCustomDefect}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )}

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

// ... (keep your existing styles unchanged)
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
    textAlign: 'center',
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
  defectsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  column: {
    width: '48%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    width: 22,
    height: 22,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  checkedBox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  otherInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32, // Align with checkbox labels
    marginTop: 5,
    marginBottom: 10,
  },
  otherInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 14,
    marginRight: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  customDefectsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  customDefectsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  customDefectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  customDefectText: {
    flex: 1,
  },
  removeCustomDefect: {
    color: 'red',
    fontSize: 16,
    marginLeft: 10,
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