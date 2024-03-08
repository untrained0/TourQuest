import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { UserDetailContext } from '../Contexts/UserDetailContext';
import ProfileButton from '../Components/ProfileScreen.js/ProfileButton';
import ProfileBody from '../Components/ProfileScreen.js/ProfileBody';
import Colors from '../Utils/Colors';

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    profileSection: {
        padding: 10,
    },
    highlightsSection: {
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
    highlightsContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
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
});

function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
