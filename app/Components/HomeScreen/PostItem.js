import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Avator from './Avator';
import { useUser } from '@clerk/clerk-expo';
import Video from 'react-native-video';
import { Ionicons } from '@expo/vector-icons';

function PostItem({ item }) {

  const video = useRef(null);
  const [isAudioPaused, setAudioPaused] = useState(true);

  const { user } = useUser();

  const handleToggleAudio = () => {
    if (video.current) {
      setAudioPaused(!isAudioPaused);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerUserContainer}>
          <Avator imgSource={{ uri: user?.imageUrl }} size={40} />
          <Text style={styles.headerUsername}>{item?.userName}</Text>
          <Image
            source={require('./../../../assets/images/plus-icon.png')}
            style={styles.verifiedIcon}
          />
        </View>
        <Image
          source={require('./../../../assets/images/plus-icon.png')}
          style={styles.optionIcon}
        />
      </View>

      <TouchableOpacity onPress={handleToggleAudio} style={styles.audioButton}>
        {isAudioPaused ? (
          <Ionicons name="mic-off" size={24} color="black" />
        ) : (
          <Ionicons name="mic" size={24} color="black" />
        )}
      </TouchableOpacity>

      <Video
        ref={video}
        style={{ width: '100%', height: 200 }}
        source={{ uri: item?.VideoUrl }}
        paused={isAudioPaused}
        resizeMode="cover"
        repeat
        ignoreSilentSwitch="ignore"
      />

      <View style={styles.actionContainer}>
        <View style={styles.actionLeftContainer}>
          <Image
            source={require('./../../../assets/images/plus-icon.png')}
            style={styles.actionItem}
          />
          <Image
            source={require('./../../../assets/images/plus-icon.png')}
            style={styles.actionItem}
          />
          <Image
            source={require('./../../../assets/images/plus-icon.png')}
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
        <Text style={styles.like}>{item?.Likes + 1} likes</Text>
        <Text style={styles.captionContainer}>
          <Text style={styles.username}>{item?.userName} </Text>
          {item.caption}
        </Text>
      </View>
      <Text style={styles.commentCount}>View all 20 comments</Text>
      <Text style={styles.postCreated}>4 days ago</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
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
    alignItems: 'center'
  },
  actionContainerRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionItem: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginHorizontal: 10
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

export default PostItem;