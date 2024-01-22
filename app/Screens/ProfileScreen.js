import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { UserDetailContext } from '../Contexts/UserDetailContext';
import ProfileButton from '../Components/ProfileScreen.js/ProfileButton';
import ProfileBody from '../Components/ProfileScreen.js/ProfileBody';

export default function Profile() {

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  let circuls = [];
  let numberofcircels = 10;

  for (let index = 0; index < numberofcircels; index++) {
    circuls.push(
      <View key={index}>
        {index === 0 ? (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              borderWidth: 1,
              opacity: 0.7,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="plus" style={{ fontSize: 40, color: 'black' }} />
          </View>
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: 'black',
              opacity: 0.1,
              marginHorizontal: 5,
            }}></View>
        )}
      </View>,
    );
  }

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      <View style={{ width: '100%', padding: 10 }}>
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
      <View>
        <Text
          style={{
            padding: 10,
            letterSpacing: 1,
            fontSize: 14,
          }}>
          Story Highlights
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          {circuls}
        </ScrollView>
      </View>
      {/* <BottomTabView /> */}
    </View>
  );
};
