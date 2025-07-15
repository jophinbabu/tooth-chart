import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import ToothCard from './components/ToothCard';
import ToothDetailModal from './components/ToothDetailModal';
import DefectiveTeethComponent from './components/DefectiveTeethComponent'; // ✅ Import added
import teethDataJson from './data/teethData.json';

export default function App() {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [teethData, setTeethData] = useState(teethDataJson);

  const screenWidth = Dimensions.get('window').width;

  const upperScrollRef = useRef(null);
  const lowerScrollRef = useRef(null);

  const upperTeeth = teethData
    .filter(t => t.quadrant.startsWith('Upper'))
    .sort((a, b) => a.number - b.number);

  const lowerTeeth = teethData
    .filter(t => t.quadrant.startsWith('Lower'))
    .sort((a, b) => a.number - b.number);

  useEffect(() => {
    const TOOTH_WIDTH = 55;
    const TOOTH_MARGIN = 7;
    const TOTAL_WIDTH = TOOTH_WIDTH + TOOTH_MARGIN * 2;

    const scrollToToothPair = (scrollRef, teeth, centerToothNumber) => {
      const index = teeth.findIndex(t => t.number === centerToothNumber);
      if (scrollRef.current && index !== -1) {
        const offset = TOTAL_WIDTH * index - screenWidth / 2 + TOTAL_WIDTH;
        scrollRef.current.scrollTo({ x: offset, animated: false });
      }
    };

    scrollToToothPair(upperScrollRef, upperTeeth, 5);
    scrollToToothPair(lowerScrollRef, lowerTeeth, 21);
  }, []);

  const handleUpdate = (updatedTooth) => {
    const newData = teethData.map(t =>
      t.id === updatedTooth.id ? updatedTooth : t
    );
    setTeethData(newData);
  };

  const renderTeethRow = (teeth, scrollRef) => {
    const centerIndex = Math.floor(teeth.length / 2);

    return (
      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.archScrollContainer}
      >
        {teeth.map((tooth, index) => (
          <React.Fragment key={tooth.id}>
            <View style={styles.toothWrapper}>
              <ToothCard tooth={tooth} onPress={setSelectedTooth} />
            </View>
            {index === centerIndex - 1 && (
              <View style={styles.verticalLine} />
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.archesContainer}>
        <View style={styles.verticalLineContainer}>
          {renderTeethRow(upperTeeth, upperScrollRef)}
          <View style={styles.separatorLine} />
          {renderTeethRow(lowerTeeth, lowerScrollRef)}
          <View style={styles.continuousVerticalLine} />
        </View>
      </View>

      {/* ✅ DefectiveTeethComponent goes here */}
      <DefectiveTeethComponent teethData={teethData} />

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
  mainContainer: {
    flexGrow: 1,
    backgroundColor: '#ebeff3',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  archesContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  archScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginVertical: 15,
  },
  toothWrapper: {
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorLine: {
    height: 2,
    backgroundColor: 'black',
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  verticalLine: {
    width: 2,
    height: 60,
    backgroundColor: 'black',
    marginHorizontal: 4,
    alignSelf: 'center',
  },
  verticalLineContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  continuousVerticalLine: {
    position: 'absolute',
    width: 2,
    height: 130,
    backgroundColor: 'black',
    top: '34%',
    zIndex: 1,
  },
});
