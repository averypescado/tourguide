import Constants from 'expo-constants';
import AppBar from './AppBar';
import { Text, StyleSheet, View, useColorScheme } from 'react-native';
import { useState } from 'react';
import Button from './Button';
import TopBar from './TopBar';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingLeft: 16,
    paddingRight: 16,
    height: '100%',
  },
  button:{
    flex: 1,
  }
});

const Main = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#000000' : '#ffffff';
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TopBar
        isAudioEnabled={isAudioEnabled}
        setIsAudioEnabled={setIsAudioEnabled}
      />
      <Button
        style={styles.button}
        isAudioEnabled={isAudioEnabled}
      />
    </View>
  );
};

export default Main;