import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Button, ImageBackground, StyleSheet } from 'react-native';
import { requestForegroundPermissionsAsync, getLastKnownPositionAsync, watchPositionAsync } from 'expo-location';
import CameraOf from './../Components/HomeScreen/Camera'; // Import the CameraOf component
import * as Speech from 'expo-speech';

const PopupComponent = ({ popupData, onClose, navigationInstruction }) => {
    const speak = async (text) => {
      try {
        await Speech.speak(text, { language: 'en' });
      } catch (error) {
        console.error('Failed to speak:', error);
      }
    };
  
    return (
      <Modal visible={true} transparent={true} animationType="slide">
        <CameraOf onClose={onClose} />
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>{popupData.content}</Text>
          <Text style={styles.popupInstruction}>{navigationInstruction}</Text>
          <Button title="Read Content" onPress={() => speak(popupData.content)} />
          <Button title="Close" onPress={onClose} />
        </View>
      </Modal>
    );
};

  

const PopupFile = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [popups, setPopups] = useState([]);
    const [selectedPopup, setSelectedPopup] = useState(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } = await requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const lastKnownLocation = await getLastKnownPositionAsync({});
                setUserLocation({
                    latitude: lastKnownLocation.coords.latitude,
                    longitude: lastKnownLocation.coords.longitude,
                });
                watchPositionAsync({}, (location) => {
                    const { latitude, longitude } = location.coords;
                    console.log(`Current Location: ${latitude}, ${longitude}`);
                    setUserLocation({ latitude, longitude });
                });
            } else {
                console.log('Location permission denied');
            }
        };

        requestLocationPermission();
    }, []);

    useEffect(() => {
        // Example popup data for three different locations
        const popupData = [
            { id: '1', latitude: 19.0449631, longitude: 72.8890771, content: 'Popup 1' },
            { id: '2', latitude: 19.0452106, longitude: 72.8889754, content: 'Popup 2' },
            // { id: '3', latitude: 19.0454000, longitude: 72.8892000, content: 'Popup 3' },
        ];

        // Calculate distance and filter popups within a certain range (e.g., 100 meters)
        const filteredPopups = popupData.filter((popup) => {
            const distance = calculateDistance(userLocation, popup);
            return distance <= 100;
        });

        setPopups(filteredPopups);
    }, [userLocation]);

    const calculateDistance = (location1, location2) => {
        if (!location1 || !location2) {
            return Infinity; // or any other default value
        }

        // Haversine formula to calculate distance between two points
        const R = 6371e3; // Earth's radius in meters
        const φ1 = (location1.latitude * Math.PI) / 180;
        const φ2 = (location2.latitude * Math.PI) / 180;
        const Δφ = ((location2.latitude - location1.latitude) * Math.PI) / 180;
        const Δλ = ((location2.longitude - location1.longitude) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    const calculateAngle = (userLocation, targetLocation) => {
        if (!userLocation || !targetLocation) {
            return null;
        }

        const φ1 = (userLocation.latitude * Math.PI) / 180;
        const φ2 = (targetLocation.latitude * Math.PI) / 180;
        const Δλ = ((targetLocation.longitude - userLocation.longitude) * Math.PI) / 180;

        const y = Math.sin(Δλ) * Math.cos(φ2);
        const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

        const angle = Math.atan2(y, x) * (180 / Math.PI);
        return (angle + 360) % 360; // Convert angle to positive value
    };

    const getDirection = (angle) => {
        if (angle >= 337.5 || angle < 22.5) return 'N';
        if (angle >= 22.5 && angle < 67.5) return 'NE';
        if (angle >= 67.5 && angle < 112.5) return 'E';
        if (angle >= 112.5 && angle < 157.5) return 'SE';
        if (angle >= 157.5 && angle < 202.5) return 'S';
        if (angle >= 202.5 && angle < 247.5) return 'SW';
        if (angle >= 247.5 && angle < 292.5) return 'W';
        if (angle >= 292.5 && angle < 337.5) return 'NW';
    };

    const navigationInstruction = (angle) => {
        const direction = getDirection(angle);
        return `Turn ${direction}`;
    };

    return (
        <View>
            {popups.map((popup, index) => (
                <PopupComponent
                    key={index}
                    popupData={popup}
                    onClose={() => setSelectedPopup(null)}
                    navigationInstruction={navigationInstruction(calculateAngle(userLocation, popup))}
                    visible={selectedPopup === popup.id}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    popupContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        padding: 20,
        borderRadius: 10,
        margin: 20,
    },
    popupTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    popupInstruction: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default PopupFile;
