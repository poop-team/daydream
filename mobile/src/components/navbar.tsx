import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BottomNavbar() {
  const value: string = "hello, world";
  return (
    <View style={styles.container}>
      <Ionicons name= "home" size={36} color="black" />
      <Ionicons name= "add-circle" size={36} color="black" />
      <Ionicons name= "md-person-circle" size={36} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    width: '100%',
    backgroundColor: '#d7daded9',
    marginTop: 'auto',
    bottom: 0,
    position: 'absolute',

    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    //align items side by side
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }, 


});
