import { useState, useMemo, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
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
          <FlatList
            className="w-screen android:mb-12"
            data={blob.posts}
            renderItem={({ item }) => (
              <Card key={item.id} url={item.imageURL} />
            )}
            keyExtractor={(item) => item.id}
            onScroll={(event) => {
              pageHeight = event.nativeEvent.contentSize.height;
              pageProgress = event.nativeEvent.contentOffset.y;
            }}
            onEndReached={() => {
              if (pageProgress > pageHeight - 1000 && !blob.isFetching) {
                blob.fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={8}
          />
        </View>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
}
