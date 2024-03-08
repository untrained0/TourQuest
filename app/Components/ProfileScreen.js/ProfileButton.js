import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function ProfileButton({ id, name, accountName, profileImage, bio }) {
    const navigation = useNavigation();
    const [follow, setFollow] = useState(false);

    return (
        <>
            {id === 0 ? (
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingVertical: 5 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { name: name, accountName: accountName, profileImage: profileImage, bio: bio })} style={{ width: '100%' }}>
                        <View style={{ width: '100%', height: 35, borderRadius: 5, borderColor: '#DEDEDE', borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3493D9' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, letterSpacing: 1, opacity: 0.8, color: 'white' }}>Edit Profile</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setFollow(!follow)} style={{ width: '30%' }}>
                        <View style={{ width: '100%', height: 35, borderRadius: 5, backgroundColor: follow ? '#DEDEDE' : '#3493D9', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DEDEDE' }}>
                            <Text style={{ color: follow ? 'black' : 'white' }}>{follow ? 'Following' : 'Follow'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '30%' }}>
                        <View style={{ width: '100%', height: 35, borderRadius: 5, backgroundColor: '#3493D9', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DEDEDE' }}>
                            <Text style={{ color: 'white' }}>Message</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '10%', height: 35, borderWidth: 1, borderColor: '#DEDEDE', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Feather name="chevron-down" style={{ fontSize: 20, color: 'black' }} />
                    </View>
                </View>
            )}
        </>
    );
};