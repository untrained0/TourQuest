import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from '../../../firebaseConfig';

export default function Posts() {

  const db = getFirestore(app);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const querySnapshot = await getDocs(collection(db, "addedPost"));
    const videoArray = [];
    
    querySnapshot.forEach((doc) => {
      const videoData = doc.data();
      videoArray.push(videoData);
    });

    setVideos(videoArray);
  }

  return (
    <View style={styles.container}>
      {videos.map((video, index) => (
        <PostItem key={index} item={video} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom:115,
  }
})

