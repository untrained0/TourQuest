import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Image, Text } from 'react-native';
import { Video } from 'expo-av';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../../firebaseConfig';
import Colors from '../../Utils/Colors';
import { generateRandomString } from '../../Utils/GenerateRandomString';
import { UserDetailContext } from '../../Contexts/UserDetailContext';

export default function AfterPostScreen() {
  const { user } = useUser();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const video = useRef(null);
  const captionInput = useRef(null);
  const navigation = useNavigation();
  const params = useRoute().params;
  const isFocused = useIsFocused();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  console.log("images: ",params?.images);


  const [caption, setCaption] = useState('');

  useEffect(() => {
    console.log('Params:', params);
    if (params && params.images) {
      console.log('Captured Images:', params.images);
    }
  }, [isFocused, params?.images]);

  console.log(params?.video);

  return (
    <View style={styles.container}>
          <Video
            ref={video}
            style={{ width: '100%', flex: 1, marginBottom: '50%' }}
            source={{
              uri: params?.video,
            }}
            useNativeControls
            resizeMode="cover"
            isLooping
          />
          {/* {params.images && (
            <View style={styles.imagesContainer}>
              {params.images.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.capturedImage} />
              ))}
            </View>
          )} */}
          <View style={styles.captionContainer}>
            <TextInput
              ref={captionInput}
              style={styles.captionInput}
              placeholder="Add a Caption..."
              onChangeText={(text) => setCaption(text)}
              multiline
            />
            <TouchableOpacity style={styles.addPostButton} 
            // onPress={onAddPost}
            onPress = {() => navigation.navigate('PhotoDetail', {images: params.images, videoCaption: caption, video: params?.video})}
            >
              <Text style={{ color: Colors.WHITE, fontSize: 20, padding: 5 }}>Next</Text>
            </TouchableOpacity>
          </View>
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
