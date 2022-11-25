import { useState, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../components/BottomNavBar";
import Card from "../components/Card";
import TopNavBar from "../components/TopNavBar";
import useAuthGetStorage from "../hooks/useGetAuthStorage";
import ImageList from "../hooks/useInfiniteQueryPosts";

export default function FeedPage({ navigation }) {
  //region hooks
  const [search, setSearch] = useState("");

  //this blob probably needs to be moved to a different file
  const blob = ImageList({
    searchValue: search,
    recentOnly: false,
    key: "feedPage",
  });
  //end region
  return (
    <View className="flex-1 bg-red-500">
      <SafeAreaView className="flex-1">
        <TopNavBar value="" onChangeText={setSearch} />
        <View className="position-relative w-screen items-center justify-center android:mt-3">
          {/*surely there is a better way to keep the scroll view above the nav*/}
          <ScrollView className="w-screen android:mb-12">
            {
              blob.posts.map((post) => (
                <Card url={post.imageURL} />
              ))
            }
          </ScrollView>
        </View>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
}
