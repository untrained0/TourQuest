import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import { Video } from 'expo-av';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { getStorage } from 'firebase/storage';
import Colors from '../../Utils/Colors';
import { UserDetailContext } from '../../Contexts/UserDetailContext';

export default function AfterPostScreen() {
  const storage = getStorage();
  const video = useRef(null);
  const captionInput = useRef(null);
  const navigation = useNavigation();
  const params = useRoute().params;
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const [caption, setCaption] = useState('');

  useEffect(() => {
    console.log('Params:', params);
    if (params && params.images) {
      console.log('Captured Images:', params.images);
    }
  }, [params?.images]);

  console.log(params?.video);

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: params?.video }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Add a caption to your video below</Text>
        <Text style={styles.infoText}>and tap 'Next' to proceed.</Text>
      </View>
      <View style={styles.captionContainer}>
        <TextInput
          ref={captionInput}
          style={styles.captionInput}
          placeholder="Add a Caption...."
          onChangeText={(text) => setCaption(text)}
          multiline
        />
        <TouchableOpacity
          style={styles.addPostButton}
          onPress={() =>
            navigation.navigate('PhotoDetail', {
              images: params.images,
              videoCaption: caption,
              video: params?.video,
            })
          }
        >
          <Text style={styles.addPostButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Add a caption to your video and tap 'Next' to proceed.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background color
  },
  videoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9, // Aspect ratio of the video
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
  captionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  captionInput: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addPostButton: {
    backgroundColor: Colors.BLUE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addPostButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
  },
});
