import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  const value: string = "hello, world";
  return (
    <View className="flex-1 justify-center items-center">
      <Text>{value}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
