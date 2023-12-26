import { ScrollView, View, Text } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import Header from '../Components/HomeScreen/Header'
import Stories from '../Components/HomeScreen/Stories'
import Post from '../Components/HomeScreen/Post'

export default function HomeScreen() {
  return (
    <View>
      <View style={{ height: 75, padding: 20, paddingLeft: 10 }}>
        <Header />
      </View>
      <ScrollView       
      showsHorizontalScrollIndicator = {false}>
      <Stories />
      <Post />
      </ScrollView> 
    </View>
  )
}