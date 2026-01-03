import { Pressable, Text, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

const Button = () => {
  // State to track if we have location permission
  const [hasPermission, setHasPermission] = useState(false);

  // Function to request location permission
  const requestLocationPermission = async () => {
    try {
      // Ask the user for permission to access their location
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        setHasPermission(true);
        Alert.alert('Success!', 'Location permission granted');
      } else {
        Alert.alert('Permission Denied', 'We need location access to find interesting places near you');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong requesting permissions');
      console.error(error);
    }
  };

  return (
    <Pressable
      style={styles.button}
      onPress={requestLocationPermission}
    >
      <Text style={styles.text}>
        {hasPermission ? 'Permission Granted!' : 'Request Location Permission'}
      </Text>
    </Pressable>
  );
};

export default Button;
