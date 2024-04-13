import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { UserDetailContext } from '../Contexts/UserDetailContext';
import ProfileButton from '../Components/ProfileScreen.js/ProfileButton';
import ProfileBody from '../Components/ProfileScreen.js/ProfileBody';
import Colors from '../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
// import { Image } from 'native-base';
import { Image } from 'react-native';

const data = [
    { id: '1', title: 'Card 1', subtitle: 'Subtitle 1', icon: 'ios-star-outline', pointsRequired: 50, image: require('../../assets/images/plus-icon.png') },
    { id: '2', title: 'Card 2', subtitle: 'Subtitle 2', icon: 'ios-heart-outline', pointsRequired: 100, image: require('../../assets/images/plus-icon.png') },
    { id: '3', title: 'Card 3', subtitle: 'Subtitle 3', icon: 'ios-checkmark-circle-outline', pointsRequired: 150, image: require('../../assets/images/plus-icon.png') },
    { id: '4', title: 'Card 4', subtitle: 'Subtitle 4', icon: 'ios-alert-circle-outline', pointsRequired: 200, image: require('../../assets/images/plus-icon.png') },
    { id: '5', title: 'Card 5', subtitle: 'Subtitle 5', icon: 'ios-information-circle-outline', pointsRequired: 250, image: require('../../assets/images/plus-icon.png') },
  ];

  const renderItem = ({ item, userDetail }) => {
    const opacity = userDetail.points < item.pointsRequired ? 0.5 : 1.0;
    return (
      <TouchableOpacity style={[styles.card, { opacity }]}>
        <View style={styles.cardHeader}>
          <Ionicons name={item.icon} size={24} color={Colors.BLUE} />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <Image
          source={require('../../assets/images/plus-icon.png')} // Assuming this is the path
          style={{ width: 100, height: 100 }}
        />
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      </TouchableOpacity>
    );
  };
  
  

export default function Profile() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  let circles = [];
  const numberOfCircles = 10;

  for (let index = 0; index < numberOfCircles; index++) {
    let circleStyle = styles.circle;
    if (index === 0) {
      circleStyle = [circleStyle, styles.addCircle];
    } else {
      circleStyle = [circleStyle, { backgroundColor: generateRandomColor() }];
    }
    circles.push(
      <View key={index} style={circleStyle} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <ProfileBody
          name={userDetail.name}
          accountName={userDetail.username}
          profileImage={{ uri: userDetail.image }}
          bio={userDetail.bio}
          followers="3.6M"
          following={userDetail.following.length}
          post="458"
        />
        <ProfileButton
          id={0}
          name={userDetail.name}
          accountName={userDetail.username}
          profileImage={{ uri: userDetail.image }}
          bio={userDetail.bio}
        />
      </View>
      <View style={styles.highlightsSection}>
        <Text style={styles.highlightsTitle}>Story Highlights</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.highlightsContainer}>
          {circles}
        </ScrollView>
      </View>
      <View style={styles.rewardSection}>
        <Text style={styles.rewardTitle}>Rewards</Text>
        <FlatList
          data={data}
          renderItem={(item) => renderItem({ item, userDetail })}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 10,
  },
  profileSection: {
    padding: 10,
  },
  highlightsSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GRAY,
    paddingTop: 10,
  },
  rewardSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GRAY,
    paddingTop: 10,
  },
  highlightsTitle: {
    paddingLeft: 10,
    letterSpacing: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  rewardTitle: {
    paddingLeft: 10,
    letterSpacing: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  highlightsContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  flatListContent: {
    paddingVertical: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.GRAY,
    opacity: 0.3,
    marginHorizontal: 5,
  },
  addCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    opacity: 0.7,
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLUE,
  },
  cardSubtitle: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
});

function generateRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
