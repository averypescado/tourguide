import Constants from 'expo-constants';
import AppBar from './AppBar';
import { Text, StyleSheet, View } from 'react-native';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    marginTop: Constants.statusBarHeight,
    paddingLeft: 16,
    paddingRight: 16
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Button />
    </View>
  );
};

export default Main;