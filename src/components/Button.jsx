import { Pressable, Text, StyleSheet } from 'react-native';

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
        console.log("Here I am")
    return (
            <Pressable 
        style={styles.button}
        onPress={() => console.log('Button pressed')}
    >
        <Text style={styles.text}>Press me</Text>
    </Pressable>




    )

}

export default Button;
