import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import Colors from '../../Utils/Colors';
import Coin from './../../../assets/images/coin.png';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { UserDetailContext } from '../../Contexts/UserDetailContext';

export default function HomeScreen({ fullname }) {

    // console.log('user', user);
// console.log('isSignedInWithClerk', user?.isSignedInWithClerk);

    const { isLoaded, isSignedIn, user } = useUser();
    const {userDetail, setUserDetail} = useContext(UserDetailContext);


    return isLoaded && isSignedIn && (
        <View>
            <View style={[{ justifyContent: 'space-between' }, styles.rowStyle]}>

             
                    <View style={styles.rowStyle}>
                        <Image
                            source={{ uri: userDetail.image }}
                            style={{ width: 50, height: 50, borderRadius: 99 }}
                        />
                        
                    </View>
                
                <View style={styles.rowStyle}>
                    <Image source={Coin} style={{ width: 35, height: 35 }} />
                    <Text style={styles.mainText}>{userDetail.points}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    mainText: {
        color: Colors.BLACK,
        fontSize: 20,
        fontFamily: 'outfit',
    },
    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
});