import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ToothCard from './components/ToothCard';
import ToothDetailModal from './components/ToothDetailModal';
import teethDataJson from './data/teethData.json';

// Utility to chunk array into smaller arrays of a given size
const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};

export default function App() {

  

  const [selectedTooth, setSelectedTooth] = useState(null);
  const [teethData, setTeethData] = useState(teethDataJson);

  // Organize teeth into upper and lower arches
  const upperTeeth = teethData
    .filter(t => t.quadrant.startsWith('Upper'))
    .sort((a, b) => a.number - b.number); // 1 - 16

  const lowerTeeth = teethData
    .filter(t => t.quadrant.startsWith('Lower'))
    .sort((a, b) => a.number - b.number); // 17 - 32

  const handleUpdate = (updatedTooth) => {
    const newData = teethData.map(t =>
      t.id === updatedTooth.id ? updatedTooth : t
    );
    setTeethData(newData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Upper Arch</Text>
      {chunkArray(upperTeeth, 4).map((row, index) => (
        <View key={`upper-${index}`} style={styles.row}>
          {row.map(tooth => (
            <ToothCard key={tooth.id} tooth={tooth} onPress={setSelectedTooth} />
          ))}
        </View>
      ))}

      <View style={styles.spacer} />

      <Text style={styles.label}>Lower Arch</Text>
      {chunkArray(lowerTeeth, 4).map((row, index) => (
        <View key={`lower-${index}`} style={styles.row}>
          {row.map(tooth => (
            <ToothCard key={tooth.id} tooth={tooth} onPress={setSelectedTooth} />
          ))}
        </View>
      ))}

      <ToothDetailModal
        visible={!!selectedTooth}
        tooth={selectedTooth}
        onClose={() => setSelectedTooth(null)}
        onUpdate={handleUpdate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f4faff',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 1,
    color: '#333',
  },
  spacer: {
    height: 20,
  },
});
