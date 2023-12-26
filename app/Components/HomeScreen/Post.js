import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import PostItem from './PostItem';

function Posts() {
  const postList = [
    {
      imgSource: require('./../../../assets/images/plus-icon.png'),
      caption: 'Grateful for this beautiful life and the amazing people in it.',
      user: {
        imgSource: require('./../../../assets/images/plus-icon.png'),
        username: 'Shopia',
        isOwn: false,
        isHasStory: true
      },
    },
    {
      imgSource: require('./../../../assets/images/plus-icon.png'),
      caption: 'Grateful for this beautiful life and the amazing people in it.',
      user: {
        imgSource: require('./../../../assets/images/plus-icon.png'),
        username: 'Alexander',
        isOwn: false,
        isHasStory: true
      },
    },
    {
      imgSource: require('./../../../assets/images/plus-icon.png'),
      caption: 'Grateful for this beautiful life and the amazing people in it.',
      user: {
        imgSource: require('./../../../assets/images/plus-icon.png'),
        username: 'Shopia',
        isOwn: false,
        isHasStory: true
      },
    }
  ]
  return (
    <View style={styles.container}>
      {
        postList.map((v, i) => {
          return(
            <PostItem key={i} item={v}/>
          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})

export default Posts;