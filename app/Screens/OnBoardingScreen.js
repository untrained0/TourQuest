import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Button, Image, Modal, Text, View } from 'react-native';

const PopupExample = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Screen1');

  const navigation = useNavigation();

  useEffect(() => {
    // Reset the current screen to 'Screen1' when modalVisible becomes true
    if (modalVisible) {
      setCurrentScreen('Screen1');
    }
  }, [modalVisible]);

  const handleNextScreen = () => {
    // Logic to navigate to the next screen
    switch (currentScreen) {
      case 'Screen1':
        setCurrentScreen('Screen2');
        break;
      case 'Screen2':
        setCurrentScreen('Screen3');
        break;
      case 'Screen3':
        setCurrentScreen('Screen4');
        break;
      default:
        break;
    }
  };

  const handlePreviousScreen = () => {
    // Logic to navigate to the previous screen
    switch (currentScreen) {
      case 'Screen2':
        setCurrentScreen('Screen1');
        break;
      case 'Screen3':
        setCurrentScreen('Screen2');
        break;
      case 'Screen4':
        setCurrentScreen('Screen3');
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Instructions" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="fade" // Added fade animation
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
            {currentScreen === 'Screen1' && (
              <>
                <Text>1. In the home screen indicated by house you can view/comment/like the existing posts and vlog which are shown based on your interests</Text>
                <Text>2. In the record page indicated by Plus sign you can record and click photos of your journey to post it on our app</Text>
                <Text>3. In the profile page indidcated by persons avtar you can edit name, bio, username of your existing profile</Text>             
              </>
            )}

            {currentScreen === 'Screen2' && (
              <>
                <Text>1. Press the follow button to follow the user and get their post at the top of your feed</Text>
                <Text>2. You can like the posts/vlog by clicking the heart below the post</Text>
                <Text>3. You can comment on the the posts/vlog by clicking the speach balloon below the post</Text>
               
              </>
            )}

            {currentScreen === 'Screen3' && (
              <>
                <Text>1.. Press the torch button to start the flashlight of your device</Text>
                <Text>2.. Press the record/dot button to start the recording</Text>
                <Text>3. Press the photo button to switch to the front camera of your device</Text>
                <Text>4. Press the camera button to click a picture</Text>
                
                
              </>
            )}

            {currentScreen === 'Screen4' && (
              <>
                <Text>1. Press the plus sign to add a profile picture</Text>
                <Text>2. Enter your name in the name column to change your existing name on the app</Text>
                <Text>3. Enter your username in the username column to change your existing username on the app</Text>
                <Text>4. Enter your bio in the bio column to change your existing bio on the app</Text>
              </>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              {currentScreen !== 'Screen1' && (
                <Button title="Previous" onPress={handlePreviousScreen} />
              )}
              {currentScreen !== 'Screen4' && (
                <Button title="Next" onPress={handleNextScreen} />
              )}
              {currentScreen === 'Screen4' && (
                <Button title="Finish" onPress={() => navigation.navigate('HomePage')} />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PopupExample;
