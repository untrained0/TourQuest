import { useUser } from '@clerk/clerk-expo';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { doc, updateDoc, arrayUnion, getFirestore, getDoc } from "firebase/firestore";
import { app } from '../../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function CommentScreen({ item }) {
  const db = getFirestore(app);
  const { user } = useUser();
  const flatListRef = useRef(null);

  const [commentText, setCommentText] = useState('');
  const [comment, setComment] = useState([]);

  const comments = [
    { id: '1', username: 'john_doe', text: 'Great shot!' },
    { id: '2', username: 'jane_smith', text: 'Love it! 😍' },
    { id: '3', username: 'user123', text: 'Awesome content!' },
    // Add more comments as needed
  ];

//   useEffect(() => {
//     getComments();
//   }, []);

// const getComments = async () => {
//   const docRef = doc(db, "addedPost", item?.id);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//     setComment(docSnap.data()?.Comments || []);
//   } else {
//     console.log("No such document!");
//   }
// };

  const addComment = async () => {
    console.log("Comment Added!");
    const washingtonRef = doc(db, "addedPost", item?.id);

    const newComment = {
      // id: comments.length + 1, // You can generate a unique ID based on your requirements
      username: user?.fullName, // Assuming you can get the username from the user object
      text: commentText,
    };

    // Atomically add a new region to the "regions" array field.
    await updateDoc(washingtonRef, {
      Comments: arrayUnion(newComment),
    });
    // Clear the comment input after adding the comment
    setCommentText('');
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Comments</Text>
      </View>

      {/* Comment Input */}
      <View style={styles.commentInputContainer}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={styles.avatar}
        />
        <TextInput
          placeholder="Add a comment..."
          style={styles.commentInput}
          multiline
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity  onPress={addComment}>
          <Ionicons name="chevron-forward-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Comment List */}
      <FlatList
        data={comments}
        ref={flatListRef}

        // keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.commentContainer}>
            {/* <Text style={styles.commentUsername}>{item.username}</Text> */}
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    maxHeight: 40,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentUsername: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});
