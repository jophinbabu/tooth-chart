import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import ToothCard from './components/ToothCard';
import ToothDetailModal from './components/ToothDetailModal';
import teethDataJson from './data/teethData.json';

export default function App() {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [teethData, setTeethData] = useState(teethDataJson);

  // Prepare upper and lower rows (left and right split)
  const upperRight = teethData
    .filter(t => t.quadrant === 'Upper Right')
    .sort((a, b) => b.number - a.number);
  const upperLeft = teethData
    .filter(t => t.quadrant === 'Upper Left')
    .sort((a, b) => a.number - b.number);

  const lowerLeft = teethData
    .filter(t => t.quadrant === 'Lower Left')
    .sort((a, b) => b.number - a.number);
  const lowerRight = teethData
    .filter(t => t.quadrant === 'Lower Right')
    .sort((a, b) => a.number - b.number);

  const handleUpdate = (updatedTooth) => {
    const newData = teethData.map(t =>
      t.id === updatedTooth.id ? updatedTooth : t
    );
    setTeethData(newData);
  };

  const renderArch = (leftTeeth, rightTeeth, isUpper) => (
    <View style={styles.rowContainer}>
      {leftTeeth.map(tooth => (
        <ToothCard key={tooth.id} tooth={tooth} onPress={setSelectedTooth} />
      ))}
      <View style={isUpper ? styles.crossLineUpper : styles.crossLineLower} />
      {rightTeeth.map(tooth => (
        <ToothCard key={tooth.id} tooth={tooth} onPress={setSelectedTooth} />
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Upper row */}
      {renderArch(upperRight, upperLeft, true)}

      {/* Lower row */}
      {renderArch(lowerLeft, lowerRight, false)}

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
    paddingVertical: 30,
    backgroundColor: '#f4faff',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  crossLineUpper: {
    width: 1,
    height: 70,
    backgroundColor: '#000',
    marginHorizontal: 10,
    transform: [{ rotate: '45deg' }],
  },
  crossLineLower: {
    width: 1,
    height: 70,
    backgroundColor: '#000',
    marginHorizontal: 10,
    transform: [{ rotate: '-45deg' }],
  },
});
