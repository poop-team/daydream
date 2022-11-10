import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Dummypage({ text }) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>{text}</Text>
    </View>
  );
}
