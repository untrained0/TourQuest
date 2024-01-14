import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import Colors from '../Utils/Colors';

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
   
        <TouchableOpacity style={styles.recordButton} onPress={onRecord}>
          <Text style={{ color: Colors.WHITE, fontSize: 20, padding: 5 }}>Record</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  recordButton: {
    backgroundColor: Colors.GREEN,
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  addPostButton: {
    backgroundColor: Colors.BLUE,
    padding: 12,
    borderRadius: 15,
  },
  captionContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  captionInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  capturedImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
