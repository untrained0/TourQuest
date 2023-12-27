import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Avator from './Avator';
import { useUser } from '@clerk/clerk-expo';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CaptionWithReadMore from './CaptionWithReadMore';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from '../../../firebaseConfig';


export default function PostItem({ item }) {

  const db = getFirestore(app);

  const video = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item?.Likes);


  const { user } = useUser();

  useEffect(() => {
    // Update likeCount when item.Likes changes
    setLikeCount(item?.Likes);
  }, [item?.Likes]);

  // Pause the previous video when a new one is about to play
  useEffect(() => {
    const playbackObject = video.current;

    return () => {
      if (playbackObject) {
        playbackObject.pauseAsync();
      }
    };
  }, [shouldPlay]);

  const handlePlayPause = () => {
    setShouldPlay(!shouldPlay);
  };

  const followBtnPress = () => {
    // Handle the press event
    console.log('Follow button pressed!');
  };

  const handleLikePress = async () => {
    setIsLiked(!isLiked);
    const newCount = likeCount + (isLiked ? -1 : 1);

    try {
      const washingtonRef = doc(db, "addedPost", item?.id);
      await updateDoc(washingtonRef, { Likes: newCount });
      setLikeCount(newCount);
    } catch (error) {
      console.error("Error updating like:", error);
      // Revert local like count in case of an error
      setIsLiked(!isLiked);
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.headerContainer}>
        <View style={styles.headerUserContainer}>
          <Avator imgSource={{ uri: user?.imageUrl }} size={40} />
          <Text style={styles.headerUsername}>{item?.userName}</Text>
          {/* <Image
            source={require('./../../../assets/images/plus-icon.png')}
            style={styles.verifiedIcon}
          /> */}
        </View>
        <TouchableOpacity
          style={styles.followButtonContainer}
          onPress={followBtnPress}
          activeOpacity={0.7} // Adjust the opacity to control the press effect
        >
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
      {/* <Image 
        source={{ uri: user?.imageUrl }}
        style={styles.postImage}
      /> */}

      <TouchableOpacity onPress={() => handlePlayPause()}>
        <Video
          ref={video}
          style={{ width: Dimensions.get('window').width,
           height: 600, borderRadius: 4}}
          source={{
            uri: item?.VideoUrl,
          }}
          useNativeControls={false}// Set to false to hide controls
          shouldPlay={shouldPlay} // Set to true for autoplay
          resizeMode="cover"
          isLooping
        />
      </TouchableOpacity>


      <View style={styles.actionContainer}>
        <View style={styles.actionLeftContainer}>
          <TouchableOpacity onPress={handleLikePress}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={isLiked ? 'red' : 'black'}
            />
          </TouchableOpacity> 
         <FontAwesome name="comment-o" size={24} color="black" />
         <Image
            source={require('./../../../assets/images/share_button.png')}
            style={styles.actionItem}
          />
        </View>
        <View style={styles.actionRightContainer}>
          <Image
            source={require('./../../../assets/images/plus-icon.png')}
            style={styles.actionItem}
          />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.like}>{likeCount} likes</Text>
        <Text style={styles.captionContainer}>
          <Text style={styles.username}>{item?.userName} </Text>
          <CaptionWithReadMore caption={item?.caption} maxLength={50} />
        </Text>
      </View>
      <Text style={styles.commentCount}>View all 20 comments</Text>
      <Text style={styles.postCreated}>4 days ago</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  followButtonContainer: {
    backgroundColor: '#0095f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0095f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    marginBottom: 20
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 5
  },
  headerUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerUsername: {
    marginLeft: 6
  },
  verifiedIcon: {
    marginLeft: 6,
    width: 15,
    height: 15,
    resizeMode: 'contain'
  },
  optionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  postImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
    marginTop: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  actionLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    alignItems: 'center',
    marginLeft: 8
  },
  actionRightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionItem: {
    width: 25,
    height: 25,
    resizeMode: 'contain',

  },
  descriptionContainer: {
    paddingHorizontal: 20,
  },
  like: {
    fontWeight: 'bold'
  },
  username: {
    fontWeight: 'bold'
  },
  captionContainer: {
    marginTop: 3
  },
  commentCount: {
    marginLeft: 20,
    marginTop: 10,
    color: '#606060'
  },
  postCreated: {
    marginLeft: 20,
    marginTop: 7,
    color: '#606060'
  }
})

