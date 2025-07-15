import React, { useState, useEffect, useRef } from 'react';

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

    scrollToToothPair(upperScrollRef, upperTeeth, 5);  // center 8 & 9
    scrollToToothPair(lowerScrollRef, lowerTeeth, 21);  // center 24 & 25
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
  <View style={styles.mainContainer}>
<View style={styles.archesContainer}>
  <View style={styles.verticalLineContainer}>
    {renderTeethRow(upperTeeth, upperScrollRef)}
    
    {/* ⬇️ Horizontal line between upper and lower row */}
    <View style={styles.separatorLine} />
    
    {renderTeethRow(lowerTeeth, lowerScrollRef)}

    {/* ⬇️ Vertical line in front of both rows */}
    <View style={styles.continuousVerticalLine} />
  </View>
</View>


    <ToothDetailModal
      visible={!!selectedTooth}
      tooth={selectedTooth}
      onClose={() => setSelectedTooth(null)}
      onUpdate={handleUpdate}
    />
  </View>
);

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ebeff3',
    justifyContent: 'flex-start',  // Align to top instead of center
    alignItems: 'center',
                   // Add some top padding if needed
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
  width: '90%',  // Adjust width as needed
  marginVertical: 10,
  alignSelf: 'center',
},

verticalLine: {
  width: 2,
  height: 60, // Adjust if needed
  backgroundColor: 'black',
  marginHorizontal: 4,
  alignSelf: 'center',
},

verticalLineContainer: {
  position: 'relative',
  width: '100%',
  alignItems: 'center',
  color:'red',
},

continuousVerticalLine: {
  position: 'absolute',
  width: 2,
  height: 130, // Adjust based on how far apart your rows are
  backgroundColor: 'black',
  top: '34%',  // You might need to fine-tune this depending on padding/margin
  zIndex: 1,
},

  // Removed centerLine style entirely since it's unused now
});