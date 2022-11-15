import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BottomNavBar({ navigation }) {
  const pressStyle =
    "active:rounded-full active:bg-indigo-800/70 active:opacity-95 h-10 w-20 items-center justify-center";
  return (
    <View className="ios:p-9 android:p-6 w-full bg-slate-200 flex-row items-center justify-between rounded-tl-lg rounded-tr-lg h-12">
      <Pressable className={pressStyle} onPress={() => {navigation.navigate('FeedPage')}}>
        <Ionicons name="home" size={33} color="black" />
      </Pressable>
      <Pressable className={pressStyle} onPress={() => {navigation.navigate('createPage')}}>
        <Ionicons name="add-circle" size={33} color="black" />
      </Pressable>
      <Pressable className={pressStyle} onPress={() => {navigation.navigate('profilePage')}}>
        <Ionicons name="md-person-circle" size={33} color="black" />
      </Pressable>
    </View>
  );
}
