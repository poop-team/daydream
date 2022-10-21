import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  BottomNavbar  from './src/components/navbar';
export default function App() {
  const value: string = "hello, world";
  return (
    <View className="flex-1 justify-center items-center">
      <Text>{value}</Text>
      <BottomNavbar />
    </View>
  );
}
