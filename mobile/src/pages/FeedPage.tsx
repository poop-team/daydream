import { useState, useMemo, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../components/BottomNavBar";
import Card from "../components/Card";
import TopNavBar from "../components/TopNavBar";
import useAuthGetStorage from "../hooks/useGetAuthStorage";
import useInfiniteQueryPosts from "../hooks/useInfiniteQueryPosts";

export default function FeedPage({ navigation }) {
  //region hooks
  const [search, setSearch] = useState("");

  //this blob probably needs to be moved to a different file
  const blob = useInfiniteQueryPosts({
    searchValue: search,
    recentOnly: false,
    key: "feedPage",
  });

  let pageHeight = 0;
  let pageProgress = 0;

  //end region
  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1">
        <TopNavBar value="" onChangeText={setSearch} />
        <View className="position-relative w-screen items-center justify-center android:mt-3">
          {/*surely there is a better way to keep the scroll view above the nav*/}
          <ScrollView
            className="w-screen android:mb-12"
            onScroll={(event) => {
              pageProgress = event.nativeEvent.contentOffset.y;
              console.log(pageProgress);
            }}
            alwaysBounceVertical={true}
            onContentSizeChange={(width, height) => {
              pageHeight = height;
              console.log(pageHeight);
            }}
          >
            <View>
              {blob.posts.map((post) => (
                <Card url={post.imageURL} key={post.id} />
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
}
