import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import React from 'react';
import Colors from '../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video} from 'expo-av';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../firebaseConfig';


export default function AddPostScreen() {

  const storage = getStorage(app);
  // const db = getFirestore(app);

  const video = React.useRef(null);
  const navigation = useNavigation();
  const params = useRoute().params;

  const onRecord = () => {
    navigation.navigate('Recorder');
  };

  const onAddPost = async (fileUri) => {
    const metadata = {
      contentType: 'video/mp4', // Set the appropriate content type for your videos
    };
  
    const response = await fetch(fileUri);
    const blob = await response.blob();
  
    const storageRef = ref(storage, 'post-videos/' + Date.now() + '.mp4');
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
  
    uploadTask.on('state_changed',
      (snapshot) => {
        // Handle upload progress if needed
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Error uploading video:', error);
      },
      async () => {
        // Handle successful upload completion
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at:', downloadURL);
        // You can save the downloadURL in your database or perform any other necessary actions here
      }
    );
  };

  return (
    <View style={styles.container}>
      {params?.video ? (
        <Video
          ref={video}
          style={{ width: '100%', flex: 1, marginBottom: 5 }}
          source={{
            uri: params?.video,
          }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      ) : (
        <TouchableOpacity style={styles.recordButton} onPress={() => onRecord()}>
          <Text style={{ color: Colors.WHITE, fontSize: 20, padding: 5 }}>Record</Text>
        </TouchableOpacity>
      )}

      {params?.video && (
        <TouchableOpacity style={styles.addPostButton} onPress={() => onAddPost(params?.video)}>
          <Text style={{ color: Colors.WHITE, fontSize: 20, padding: 5 }}>Add Post</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: Colors.GREEN,
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  addPostButton: {
    backgroundColor: Colors.BLUE, // Use a color of your choice
    padding: 12,
    borderRadius: 15,
  },
});
