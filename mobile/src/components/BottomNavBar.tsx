import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BottomNavBar() {
  const pressStyle =
    "active:rounded-full active:bg-indigo-800/70 active:opacity-95 h-10 w-20 items-center justify-center";
  return (
    <View className="w-full bg-slate-200 flex-row items-center justify-around absolute bottom-0 rounded-tl-lg rounded-tr-lg h-12">
      <Pressable className={pressStyle} onPress={() => {}}>
        <Ionicons name="home" size={27} color="black" />
      </Pressable>
      <Pressable className={pressStyle} onPress={() => {}}>
        <Ionicons name="add-circle" size={27} color="black" />
      </Pressable>
      <Pressable className={pressStyle} onPress={() => {}}>
        <Ionicons name="md-person-circle" size={27} color="black" />
      </Pressable>
    </View>
  );
}
