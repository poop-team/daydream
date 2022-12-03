import { SafeAreaView, Image, View, Text, ScrollView } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import Button from "../components/Button";
import { useState } from "react";

export default ({ navigation }) => {
  const [search, setSearch] = useState("");

  const urls = [
    "https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F9d532691aa47444996dba0e889b6a728.png&w=1080&q=90",
    "https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F9d532691aa47444996dba0e889b6a728.png&w=1080&q=90",
    "https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F9d532691aa47444996dba0e889b6a728.png&w=1080&q=90",
  ];

  return (
    <View className="w-full flex flex-1 justify-between">
      <SafeAreaView className="w-full flex flex-1">
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
            <View className="flex flex-row gap-2 m-4 w-full justify-center">
              <Button className="py-0">
                <Text className="text-base text-slate-50">Created</Text>
              </Button>
              <Button className="py-0">
                <Text className="text-base text-slate-50">Collections</Text>
              </Button>
            </View>
            <TopNavBar value={search} onChangeText={setSearch} />
            <View className="w-full flex flex-row flex-wrap justify-evenly gap-y-1 my-1">
              {urls.map((uri: string) => (
                <Image
                  source={{ uri }}
                  className="rounded-lg h-[48vw] aspect-square"
                />
              ))}
              {urls.length % 2 === 1 && (
                <View className="rounded-lg h-[48vw] aspect-square" />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};
