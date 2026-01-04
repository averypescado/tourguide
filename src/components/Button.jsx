import { Pressable, Text, StyleSheet, Alert, ActivityIndicator, View, ScrollView, useColorScheme, Animated, Image } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { getLocalInfo } from '../services/llmService';
import Feather from '@expo/vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#f43d00ff',
    padding: 16,
    height: 96,
    borderRadius: 48,
    marginBottom: 72,
    // marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 24,
    flexGrow: 1,
    // backgroundColor: '#f5f5f5'
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    // color: '#b2b2b2ff',
  },

  latText:{
    fontSize: 12,
    // backgroundColor: 'green',
  },

  ActionLayout:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8
    // backgroundColor: 'green',
  },

  introText: {
    fontSize: 48,
    lineHeight: 48,
    position: 'absolute',
    alignSelf: 'center',
    color: '#1b1b1bff',
  },
  cityImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 20,
    overflow: 'hidden',
  },
  saveButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#9e9e9eff',
    borderRadius: 8,
    alignItems: 'center',
    width: '25%',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  butx:{
    backgroundColor: '#ecececff',
    padding: 4,
    borderRadius: 24,
    marginLeft: 'auto'
    
  }
});

const Button = ({ style, isAudioEnabled }) => {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [discoveredInfo, setDiscoveredInfo] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Configure audio to play even when phone is on silent
    const configureAudio = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });
    };

    configureAudio();
  }, []);

  useEffect(() => {
    if (discoveredInfo) {
      // Reset and animate in
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [discoveredInfo, fadeAnim]);

  const handleStop = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const handleSave = () => {
    console.log('Save button pressed!');
    console.log('Discovered Info:', discoveredInfo);
    console.log('Location:', latitude, longitude);
  };

  const handlePress = async () => {
    // If speech is playing, stop it
    if (isSpeaking) {
      handleStop();
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need location permission to find local information');
        setIsLoading(false);
        return;
      }

      // Step 2: Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude: lat, longitude: lng } = location.coords;

      // Save location to state
      setLatitude(lat);
      setLongitude(lng);

      console.log('Location:', lat, lng);

      // Step 3: Call LLM API with location
      const localInfo = await getLocalInfo(lat, lng);

      console.log('Local Info:', localInfo);

      // Save the discovered info to state
      setDiscoveredInfo(localInfo);

      // Step 4: Play audio only if enabled
      if (isAudioEnabled) {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
        });

        setIsSpeaking(true);

        Speech.speak(localInfo, {
          language: 'en',
          pitch: 1.0,
          rate: 0.9,
          onDone: () => setIsSpeaking(false),
          onStopped: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false),
        });
      }

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {discoveredInfo && (
        <Animated.View style={[styles.infoContainer, { opacity: fadeAnim }]}>
          <ScrollView >
            <Text style={[styles.infoText, { color: colorScheme === 'dark' ? '#ffffff' : '#333333' }]}>
              {discoveredInfo}
            </Text>
            <View style={[styles.ActionLayout, { color: colorScheme === 'dark' ? '#b2b2b2' : '#666666' }]}>
              <Text style={[styles.latText, { color: colorScheme === 'dark' ? '#ffffff' : '#333333' }]}>{latitude} </Text>
              <Text style={[styles.latText, { color: colorScheme === 'dark' ? '#ffffff' : '#333333' }]}>{longitude}</Text> 
              {/* <View style={styles.butx}><Feather name="bookmark" size={20} color="black" /></View> */}
            </View>


            {/* <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable> */}
          </ScrollView>
        </Animated.View>
      )}
      {!discoveredInfo && (
        <View style={styles.infoContainer}>
          <Text style={styles.introText}>Learn about where you are</Text>
          <Image
            source={require('../../assets/citydrawing.png')}
            style={styles.cityImage}
          />
        </View>
      )}

      <Pressable
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handlePress}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : isSpeaking ? (
          <Text style={styles.text}>Stop</Text>
        ) : (
          <Text style={styles.text}>Tell me about where I am</Text>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
