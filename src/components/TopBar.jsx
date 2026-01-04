import { View, StyleSheet, Pressable, useColorScheme } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
});

const TopBar = ({ isAudioEnabled, setIsAudioEnabled }) => {
  const colorScheme = useColorScheme();

  const iconColor = colorScheme === 'dark' ? '#ffffff' : '#333333';

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    console.log('Audio toggled:', !isAudioEnabled);
  };

  const openSavedFactoids = () => {
    console.log('Open saved factoids');
  };

  return (
    <View style={styles.container}>
      {/* Left: Audio toggle button */}
      <Pressable style={styles.iconButton} onPress={toggleAudio}>
        <Feather
          name={isAudioEnabled ? 'volume-2' : 'volume-x'}
          size={24}
          color={iconColor}
        />
      </Pressable>

      {/* Right: Saved factoids button */}
      {/* <Pressable style={styles.iconButton} onPress={openSavedFactoids}>
        <Feather
          name="bookmark"
          size={24}
          color={iconColor}
        />
      </Pressable> */}
    </View>
  );
};

export default TopBar;
