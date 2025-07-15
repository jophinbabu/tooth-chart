import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import ToothCard from './components/ToothCard';
import ToothDetailModal from './components/ToothDetailModal';
import teethDataJson from './data/teethData.json';

export default function App() {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [teethData, setTeethData] = useState(teethDataJson);

  const screenWidth = Dimensions.get('window').width;

  const upperTeeth = teethData
    .filter(t => t.quadrant.startsWith('Upper'))
    .sort((a, b) => a.number - b.number); // 1-16

  const lowerTeeth = teethData
    .filter(t => t.quadrant.startsWith('Lower'))
    .sort((a, b) => a.number - b.number); // 17-32

  const handleUpdate = (updatedTooth) => {
    const newData = teethData.map(t =>
      t.id === updatedTooth.id ? updatedTooth : t
    );
    setTeethData(newData);
  };

  const renderArch = (teeth, label, archKey) => {
    return (
      <View style={styles.archWrapper}>
        <Text style={styles.label}>{label}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.archScrollContainer}
        >
          {teeth.map((tooth, index) => (
            <View
              key={tooth.id}
              style={[
                styles.toothWrapper,
                index === 7 && styles.centerSeparatorWrapper, // after 8th tooth
              ]}
            >
              <ToothCard tooth={tooth} onPress={setSelectedTooth} />
              {index === 7 && <View style={styles.centerLine} />}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderArch(upperTeeth, 'Upper Arch', 'upper')}
      {renderArch(lowerTeeth, 'Lower Arch', 'lower')}

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
    backgroundColor: '#f4faff',
    alignItems: 'center',
  },
  archWrapper: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  archScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  toothWrapper: {
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSeparatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerLine: {
    width: 1,
    height: 50,
    backgroundColor: '#000',
    marginLeft: 5,
  },
});
