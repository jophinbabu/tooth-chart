import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { getToothImage } from './toothImages'; // ✅ Correct import

const DefectiveTeethComponent = ({ teethData }) => {
  // Filter teeth that have defects or details
  const defectiveTeeth = teethData.filter(tooth => 
    (tooth.defect && tooth.defect.length > 0) || 
    (tooth.details && tooth.details.trim() !== '')
  );

  const renderDefectiveToothCard = ({ item: tooth }) => {
const toothImage = getToothImage(tooth.photo);
    
    return (
      <View style={styles.defectiveToothCard}>
        <View style={styles.toothImageContainer}>
          <Image 
            source={toothImage} 
            style={styles.toothImage}
            resizeMode="contain"
          />
          <Text style={styles.toothNumber}>#{tooth.number}</Text>
        </View>
        
        <View style={styles.toothInfoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.toothName}>{tooth.name}</Text>
            <Text style={styles.quadrantText}>{tooth.quadrant}</Text>
          </View>
          
          <View style={styles.contentRow}>
            {tooth.defect && tooth.defect.length > 0 && (
              <View style={styles.defectsContainer}>
                <Text style={styles.defectsTitle}>Defects:</Text>
                <View style={styles.defectsList}>
                  {tooth.defect.map((defect, index) => (
                    <Text key={index} style={styles.defectText}>• {defect}</Text>
                  ))}
                </View>
              </View>
            )}
            
            {tooth.details && tooth.details.trim() !== '' && (
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Details:</Text>
                <Text style={styles.detailsText}>{tooth.details}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  if (defectiveTeeth.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Defective Teeth Report</Text>
        <View style={styles.noDefectsContainer}>
          <Text style={styles.noDefectsText}>No teeth with defects or issues found.</Text>
          <Text style={styles.noDefectsSubtext}>All teeth appear to be in good condition.</Text>
        </View>
      </View>
    );
  }

return (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.sectionTitle}>Defective Teeth Report</Text>
      <Text style={styles.sectionSubtitle}>
        {defectiveTeeth.length} tooth{defectiveTeeth.length !== 1 ? 'es' : ''} requiring attention
      </Text>
    </View>

    <View style={styles.listContainer}>
      {defectiveTeeth.map((tooth) => (
        <View key={tooth.id}>
          {renderDefectiveToothCard({ item: tooth })}
        </View>
      ))}
    </View>
  </View>
);

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8, // Reduced from 12
    marginBottom: 10, // Reduced from 15
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
    width: '95%',
  },
  headerContainer: {
    marginBottom: 8, // Reduced spacing
  },
  sectionTitle: {
    fontSize: 14, // Reduced from 16
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2, // Reduced from 4
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 11, // Reduced from 12
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 0, // Removed bottom margin
  },
  listContainer: {
    paddingBottom: 5, // Reduced from 10
  },
  defectiveToothCard: {
    flexDirection: 'row',
    backgroundColor: '#fef2f2',
    borderRadius: 6,
    padding: 6, // Reduced from 8
    marginBottom: 4, // Reduced from 6
    borderLeftWidth: 3,
    borderLeftColor: '#ef4444',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  toothImageContainer: {
    alignItems: 'center',
    marginRight: 8,
    minWidth: 45, // Reduced from 50
  },
  toothImage: {
    width: 35, // Reduced from 40
    height: 35, // Reduced from 40
    marginBottom: 1, // Reduced from 2
  },
  toothNumber: {
    fontSize: 9, // Reduced from 10
    fontWeight: '600',
    color: '#374151',
    backgroundColor: '#ffffff',
    paddingHorizontal: 3, // Reduced from 4
    paddingVertical: 1,
    borderRadius: 6, // Reduced from 8
    overflow: 'hidden',
  },
  toothInfoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3, // Reduced spacing
  },
  toothName: {
    fontSize: 11, // Reduced from 12
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  quadrantText: {
    fontSize: 9, // Reduced from 10
    color: '#6b7280',
    marginLeft: 8,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  defectsContainer: {
    flex: 1,
    marginRight: 8,
  },
  defectsTitle: {
    fontSize: 10, // Reduced from 11
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 1, // Reduced from 2
  },
  defectsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  defectText: {
    fontSize: 9, // Reduced from 10
    color: '#374151',
    marginRight: 8,
    marginBottom: 1,
  },
  detailsContainer: {
    flex: 1,
  },
  detailsTitle: {
    fontSize: 10, // Reduced from 11
    fontWeight: '600',
    color: '#059669',
    marginBottom: 1, // Reduced from 2
  },
  detailsText: {
    fontSize: 9, // Reduced from 10
    color: '#374151',
    lineHeight: 12, // Reduced from 14
  },
  noDefectsContainer: {
    alignItems: 'center',
    paddingVertical: 10, // Reduced from 15
  },
  noDefectsText: {
    fontSize: 14, // Reduced from 16
    fontWeight: '500',
    color: '#059669',
    marginBottom: 4, // Reduced from 8
  },
  noDefectsSubtext: {
    fontSize: 12, // Reduced from 14
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default DefectiveTeethComponent;