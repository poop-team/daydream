import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../components/BottomNavBar";
import Card from "../components/Card";
import TopNavBar from "../components/TopNavBar";
import useInfiniteQueryPosts from "../hooks/useInfiniteQueryPosts";
import useDebounce from "../hooks/useDebounce";

export default function FeedPage({ navigation }) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const {posts, isFetching, isFetchingNextPage, fetchNextPage} = useInfiniteQueryPosts({
    searchValue: debouncedSearch,
    limit: 8,
    recentOnly: false,
    key: "feed_posts",
  });

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1">
        <TopNavBar onChangeText={setSearch} />
        <View className="position-relative w-screen items-center justify-evenly android:mt-3">
          <FlatList
            className="w-screen android:mb-12"
            data={posts}
            renderItem={({ item }) => (
              <Card key={item.id} url={item.imageURL} />
            )}
            keyExtractor={(item) => item.id}
            onEndReached={() => {
              if (!isFetching) {
                fetchNextPage();
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
