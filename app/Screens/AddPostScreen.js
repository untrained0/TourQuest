import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native';

export default function AddPostScreen(props) {

  const navigation = useNavigation();

const onRecord = () => {
  // console.log(props);
  navigation.navigate('Recorder');
}

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onRecord()}>
        <Text style={{color: Colors.WHITE, fontSize: 20, padding: 5}}>Record</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: Colors.GREEN,
    padding: 12,
    borderRadius: 15,
  }
})