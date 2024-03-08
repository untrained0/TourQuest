import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import Colors from '../Utils/Colors';
import { useEffect } from 'react';

export default function AddPostScreen() {
  const navigation = useNavigation();
  const params = useRoute().params;
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('Params:', params);
    if (params && params.images) {
      console.log('Captured Images:', params.images);
    }
  }, [isFocused, params?.images]);

  const onRecord = () => {
    navigation.navigate('Recorder');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tapToRecordText}>Tap here to record...</Text>

      <TouchableOpacity style={styles.recordButton} onPress={onRecord}>
        <View style={styles.innerButton}>
          <View style={styles.redDot} />
          <Text style={styles.recText}>REC</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapToRecordText: {
    color: Colors.GRAY,
    fontSize: 18,
    marginBottom: 20,
  },
  recordButton: {
    backgroundColor: Colors.LIGHTGREY,
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal:10,
    paddingVertical: 15,
    width: '30%', // Adjust the width as needed
    alignItems: 'center',
  },
  innerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: Colors.RED,
    marginRight: 10,
  },
  recText: {
    color: Colors.GRAY,
    fontSize: 20,
    fontWeight: 'bold',
  },
});