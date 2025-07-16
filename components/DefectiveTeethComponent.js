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
  // ✅ Moved inside the component
  const defectiveTeeth = teethData
    .filter(tooth =>
      (tooth.defect && tooth.defect.length > 0) ||
      (tooth.details && tooth.details.trim() !== '')
    )
    .sort((a, b) => {
      const aTime = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
      const bTime = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
      return bTime - aTime; // Newest on top
    });

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
                  {tooth.defect.map((defect, index) => {
                    const defectText =
                      typeof defect === 'string' ? defect : String(defect?.type || '');
                    const defectDate = typeof defect === 'object' ? defect.date : null;

                    return (
                      <View key={`${defectText}_${index}`} style={styles.defectItem}>
                        <Text style={styles.defectText}>
                          • {defectText} {defectDate ? `(${defectDate})` : ''}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            {tooth.details && tooth.details.trim() !== '' && (
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Details:</Text>
                <Text style={styles.detailsText}>
                  {tooth.details.startsWith('Diagnosis:')
                    ? tooth.details
                    : `Diagnosis: ${tooth.details}`}
                </Text>
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
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f3f0f0',
    
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.08,
    // shadowRadius: 2,
    // elevation: 3,
    width: '95%',
  },
  headerContainer: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 0,
  },
  listContainer: {
    paddingBottom: 5,
  },
  defectiveToothCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f2f2',
    borderRadius: 6,
    padding: 6,
    marginBottom: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#b6087c',
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
    minWidth: 45,
  },
  toothImage: {
    width: 35,
    height: 35,
    marginBottom: 1,
  },
  toothNumber: {
    fontSize: 9,
    fontWeight: '600',
    color: '#374151',
    backgroundColor: '#ffffff',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 6,
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
    marginBottom: 3,
  },
  toothName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  quadrantText: {
    fontSize: 9,
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
    fontSize: 11,
    fontWeight: '900',
    color: '#b6087c',
    marginBottom: 1,
  },
  defectsList: {
    // Changed from flexDirection: 'row' to column for better layout
    flexDirection: 'column',
  },
  defectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  defectText: {
    fontSize: 9,
    color: '#374151',
    marginRight: 4,
    fontWeight: '600'
  },
  defectDate: {
    fontSize: 8,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  detailsContainer: {
    flex: 1,
  },
  detailsTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 1,
  },
  detailsText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 12,
    fontWeight: '600'
  },
  noDefectsContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  noDefectsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#059669',
    marginBottom: 4,
  },
  noDefectsSubtext: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default DefectiveTeethComponent;