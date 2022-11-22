import { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../components/BottomNavBar";
import Card from "../components/Card";
import TopNavBar from "../components/TopNavBar";
import { getAuthSession } from "../utils/storage";
import * as SecureStore from "expo-secure-store";

export default function FeedPage({ navigation }) {

  //region hooks
  const [search, setSearch] = useState("");
  
  //end region

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1">
      <TopNavBar value="" onChangeText={setSearch} />
      <View className="position-relative w-screen h-screen items-center justify-center top-10">
        <ScrollView className="w-screen h-screen position-relative scroll ">
          
        </ScrollView>
      </View>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
}
