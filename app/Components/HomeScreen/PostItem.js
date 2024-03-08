import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Modal, ToastAndroid, Alert } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Avator from './Avator';
import { useUser } from '@clerk/clerk-expo';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CaptionWithReadMore from './CaptionWithReadMore';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from '../../../firebaseConfig';
import CommentScreen from './CommentScreen';
import { UserDetailContext } from '../../Contexts/UserDetailContext';
import { useNavigation } from '@react-navigation/native';


export default function PostItem({ item }) {
  const db = getFirestore(app);
  const video = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item?.Likes);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // New state

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { user } = useUser();

  const navigation = useNavigation();

  useEffect(() => {
    setLikeCount(item?.Likes);
  }, [item?.Likes]);

  const followBtnPress = async (followID) => {
    console.log('Follow button pressed!');
    const washingtonRef = doc(db, "UserDetail", " " + userDetail.id.trim());

    setUserDetail(prevState => ({
      ...prevState,
      following: [...prevState.following, followID],
    }));

    await updateDoc(washingtonRef, {
      userDetail: userDetail,
    });

    setIsFollowing(true);
    ToastAndroid.show('Followed Successfully!', ToastAndroid.SHORT);
  };

  const unfollowBtnPress = (followID) => {
    console.log('function called!');
    Alert.alert(
      'Confirm Unfollow',
      'Are you sure you want to unfollow?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Unfollow',
          onPress: async () => {
            const washingtonRef = doc(db, "UserDetail", " " + userDetail.id.trim());

            setUserDetail(prevState => ({
              ...prevState,
              following: prevState.following.filter(id => id !== followID),
            }));

            await updateDoc(washingtonRef, {
              userDetail: userDetail,
            });

            setIsFollowing(false);
            ToastAndroid.show('Unfollowed Successfully!', ToastAndroid.SHORT);
          },
        },
      ],
      { cancelable: true }
    );
  };

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

  const handleLikePress = async () => {
    setIsLiked(!isLiked);
    const newCount = likeCount + (isLiked ? -1 : 1);

    try {
      const washingtonRef = doc(db, "addedPost", item?.PostId);
      await updateDoc(washingtonRef, { Likes: newCount });
      setLikeCount(newCount);
    } catch (error) {
      console.error("Error updating like:", error);
      setIsLiked(!isLiked);
    }
  };

  const handleCommentPress = () => {
    setModalVisible(true);
  };

  const calculateTimeDifference = () => {
    if (!item?.createdAt) {
      return 'Unknown date';
    }

    const currentDate = new Date();
    const createdDate = item.createdAt.toDate(); // Convert Firestore timestamp to JavaScript Date object

    const timeDifference = Math.abs(currentDate - createdDate);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      // If it's today, show hours
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      if (hoursDifference > 0) {
        return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
      } else {
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
      }
    } else if (daysDifference === 1) {
      return 'Yesterday';
    } else {
      return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    }
  };

  // console.log(userDetail);
  // console.log(item?.createdAt);

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
          onPress={() => {
            if (isFollowing) {
              unfollowBtnPress(item?.UserID);
            } else {
              followBtnPress(item?.UserID);
            }
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Image 
        source={{ uri: user?.imageUrl }}
        style={styles.postImage}
      /> */}

      <TouchableOpacity onPress={() => handlePlayPause()}>
        <Video
          ref={video}
          style={{
            width: Dimensions.get('window').width,
            height: 600, borderRadius: 4
          }}
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
          <TouchableOpacity onPress={handleCommentPress}>
            <FontAwesome name="comment-o" size={24} color="black" />
          </TouchableOpacity>

          {/* <Image
            source={require('./../../../assets/images/share_button.png')}
            style={styles.actionItem}
          /> */}
        </View>
        <View style={styles.actionRightContainer}>
          <TouchableOpacity
            style={styles.followButtonContainer}
            onPress={() => navigation.navigate('Tour')} // Wrap navigation function in arrow function
            activeOpacity={0.7}
          >
            <Text style={styles.followButtonText}>Tour</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.like}>{likeCount} likes</Text>
        <Text style={styles.captionContainer}>
          <Text style={styles.username}>{item?.userName} </Text>
          <CaptionWithReadMore caption={item?.caption} maxLength={50} />
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleCommentPress()}>
        <Text style={styles.commentCount}>View all {item?.Comments.length} {item?.Comments.length == 1 ? 'comment' : 'comments'}</Text>
      </TouchableOpacity>
      <Text style={styles.postCreated}>{calculateTimeDifference()}</Text>

      {/* Comment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CommentScreen item={item} />
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
    marginRight: 12,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // align modal content at the bottom
  },
  modalContent: {
    // backgroundColor: 'transparent',
    height: '60%', // Set height to 60% of the screen height
  },
})

