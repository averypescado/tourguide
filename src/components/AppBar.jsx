import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'green',
    paddingLeft: 24,
    paddingBottom: 16,

  }
});

const AppBar = () => {
  return <View style={styles.container}><Pressable><Text>Repositories</Text></Pressable></View>;
};

export default AppBar;