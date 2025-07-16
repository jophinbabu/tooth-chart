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
  const timestampedTooth = {
    ...updatedTooth,
    lastUpdated: new Date().toISOString(),
  };

  const newData = teethData.map(t =>
    t.id === updatedTooth.id ? timestampedTooth : t
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
      
      
      {teeth.map((tooth, index) => {
  // Insert a spacer after the left center tooth
  const isLeftOfCenter = index === centerIndex - 1;

  return (
    <React.Fragment key={tooth.id}>
      <View style={styles.toothWrapper}>
        <ToothCard tooth={tooth} onPress={setSelectedTooth} />
      </View>

      {isLeftOfCenter && (
        <View style={styles.toothSpacer} />
      )}
    </React.Fragment>
  );
})}


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
    backgroundColor: '#fbfdff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  archesContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#ffe6eb',
  },
  archScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginVertical: 1,
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
  width: 1,
  height: '100%', // Stretches from top to bottom of archesContainer
  backgroundColor: 'black',
  left: '50%', // Centers horizontally between teeth 8 and 9
  transform: [{ translateX: -1 }], // Adjust for 2px width (to center it)
  zIndex: 1,
  
  },

  toothSpacer: {
  width: 7, // 👈 Adjust this value to control the gap size
},

});