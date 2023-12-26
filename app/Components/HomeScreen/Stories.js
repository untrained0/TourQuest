import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import StoryItem from './StoryItem';

function Stories() {
  const storyList = [
    {
      imgSource: require('./../../../assets/images/plus-icon.png'),
      username: '',
      isOwn: true,
      isHasStory: false
    },
    {
      imgSource: require('./../../../assets/images/plus-icon.png'),
      username: 'Emily',
      isOwn: false,
      isHasStory: true
    },
    {
      imgSource: require('./../../../assets/images/plus-icon.png'),
      username: 'Alexander',
      isOwn: false,
      isHasStory: true
    },
    {
      imgSource: require('./../../../assets/images/plus-icon.png'),
      username: 'Shopia',
      isOwn: false,
      isHasStory: true
    },
    {
      imgSource: require('./../../../assets/images/plus-icon.png'),
      username: 'Michael',
      isOwn: false,
      isHasStory: true
    },
    {
      imgSource: require('./../../../assets/images/plus-icon.png'),
      username: 'Ava',
      isOwn: false,
      isHasStory: true
    },
    {
      imgSource: require('./../../../assets/images/plus-icon.png'),
      username: 'Isabella',
      isOwn: false,
      isHasStory: true
    }
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {
        storyList.map((v, i) => {
          return (
            <StoryItem key={i} item={v}/>
          )
        })
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})

export default Stories;
