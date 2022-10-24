import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Dummypage from './pages/Dummypage';
export default function BottomNavbar() {
  
  const value: string = "hello, world";
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}}>
        <Ionicons name= "home" size={27} color="black" />
      </Pressable>
      <Pressable onPress={() => {}}>
        <Ionicons name= "add-circle" size={27} color="black" />
      </Pressable>
      <Pressable onPress={() => {}}>
        <Ionicons name= "md-person-circle" size={27} color="black" />
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    width: '100%',
    backgroundColor: '#d7daded9',
    marginTop: 'auto',
    bottom: 0,
    height: 5e1,
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
