import { SafeAreaView, Image, View, Text, ScrollView } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import Button from "../components/Button";
import Card from "../components/Card";
import { useState } from "react";

export default ({ navigation }) => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView className="w-full flex flex-1 justify-between">
      <ScrollView>
        <View className="flex items-center mt-16">
          <Image
            className="w-48 h-48 m-4 rounded-full"
            source={require("../images/daydream_logo_words.png")}
            />
          <View className="flex flex-row gap-2">
            <Text>0 views</Text>
            <Text>0 saved</Text>
          </View>
          <View className="flex flex-row gap-2 m-4">
            <Button className="py-0">
              <Text className="text-base text-slate-50">Created</Text>
            </Button>
            <Button className="py-0">
              <Text className="text-base text-slate-50">Collections</Text>
            </Button>
          </View>
          <TopNavBar value={search} onChangeText={setSearch} />
          <Card></Card>
        </View>
      </ScrollView>
      <View>
        <BottomNavBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};
