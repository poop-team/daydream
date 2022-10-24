import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function Dummypage(prop) {
  const value: string = "hello, world";
  return (
    <View className="flex-1 justify-center items-center">
        <Text>{prop.string}</Text>
    </View>
  );
}

