import { NativeBaseProvider } from 'native-base'; // Import NativeBaseProvider
import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { useRef, useState } from 'react';
import { FlatList } from 'native-base';
import slides from '../Utils/slides';
import OnBoardingItem from '../Components/OnBoardingScreen/OnBoardingItem';
import { setCurrentScreen } from 'firebase/analytics';

export default function OnBoardingScreen() {

    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;

    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold : 50}).current;

    return (
        // <NativeBaseProvider> {/* Wrap the component with NativeBaseProvider */}
        <View style={styles.container}>
           <View style={{flex : 3}}>
           <FlatList
                data={slides}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <OnBoardingItem item={item} />
                    </View>
                )}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
            />
           </View>
        </View>
        // </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
