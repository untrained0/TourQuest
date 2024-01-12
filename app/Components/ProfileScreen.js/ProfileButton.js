import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";

export default function ProfileButton ({id, name, accountName, profileImage, bio}) {
    const navigation = useNavigation();
    const [follow, setFollow] = useState(follow);
    return (
      <>
        {id === 0 ? (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              paddingVertical: 5,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProfile'
                , {
                  name: name,
                  accountName: accountName,
                  profileImage: profileImage,
                  bio: bio,
                }
                )
              }
              style={{
                width: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  height: 35,
                  borderRadius: 5,
                  borderColor: '#DEDEDE',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    letterSpacing: 1,
                    opacity: 0.8,
                  }}>
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setFollow(!follow)}
              style={{width: '42%'}}>
              <View
                style={{
                  width: '100%',
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: follow ? null : '#3493D9',
                  borderWidth: follow ? 1 : 0,
                  borderColor: '#DEDEDE',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: follow ? 'black' : 'white'}}>
                  {follow ? 'Following' : 'Follow'}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: '42%',
                height: 35,
                borderWidth: 1,
                borderColor: '#DEDEDE',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text>Message</Text>
            </View>
            <View
              style={{
                width: '10%',
                height: 35,
                borderWidth: 1,
                borderColor: '#DEDEDE',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Feather
                name="chevron-down"
                style={{fontSize: 20, color: 'black'}}
              />
            </View>
          </View>
        )}
      </>
    );
  };