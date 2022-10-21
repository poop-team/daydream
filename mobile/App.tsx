import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  BottomNavbar  from './src/components/navbar';
export default function App() {
  const value: string = "hello, world";
  return (
    <View style={styles.container}>
      <Text>{value}</Text>
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
