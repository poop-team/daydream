import { useState, useCallback } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../components/BottomNavBar";
import Card from "../components/Card";
import TopNavBar from "../components/TopNavBar";
import useInfiniteQueryPosts from "../hooks/useInfiniteQueryPosts";
import useDebounce from "../hooks/useDebounce";
import { useFocusEffect } from "@react-navigation/native";

export default function FeedPage({ navigation }) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const blob = useInfiniteQueryPosts({
    searchValue: debouncedSearch,
    limit: 8,
    recentOnly: false,
    key: "feed_posts",
  });

  useFocusEffect(
    useCallback(() => {
      blob.refetch();
    }, [])
  );

  let pageHeight = 0;
  let pageProgress = 0;
  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1">
        <TopNavBar value={search} onChangeText={setSearch} />
        <View className="position-relative w-screen items-center justify-center android:mt-3">
          {/*surely there is a better way to keep the scroll view above the bottomNav*/}
          <FlatList
            className="w-screen android:mb-12"
            data={blob.posts}
            renderItem={({ item }) => (
              <Card key={item.id} post={item}/>
            )}
            keyExtractor={(item) => item.id}
            onScroll={(event) => {
              pageHeight = event.nativeEvent.contentSize.height;
              pageProgress = event.nativeEvent.contentOffset.y;
            }}
            onEndReached={() => {
              if (pageProgress / pageHeight > 0.65 && !blob.isFetching) {
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
