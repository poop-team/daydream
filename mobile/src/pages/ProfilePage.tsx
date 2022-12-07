import {
  SafeAreaView,
  Image,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthSession } from "../utils/storage";
import { getCollections, getUser } from "../requests/fetch";
import useInfiniteQueryPosts from "../hooks/useInfiniteQueryPosts";
import { Post } from "../types/post.type";
import useDebounce from "../hooks/useDebounce";
import Card from "../components/Card";
import CollectionCard from "../components/CollectionCard";
import Collection from "../types/collection.type";

export default ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);

  const debouncedSearch = useDebounce(search, 500);

  const [currentView, setCurrentView] = useState<"created" | "collections">(
    "created"
  );

  useEffect(() => {
    (async () => {
      const { userId, userAvatar, userName } = await getAuthSession();
      setUserId(userId);
      setUserName(userName);
      setUserAvatar(userAvatar);
    })();
  }, []);

  const {
    data: user,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useQuery({
    // FIXME figure out how to incorporate userid here
    queryKey: ["user_profile"],
    queryFn: async () => {
      return getUser({});
    },
  });

  const { posts, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQueryPosts({
      key: "user_posts",
      searchValue: debouncedSearch,
      userId,
      limit: 8,
      recentOnly: true,
      queryOptions: {
        enabled: !!userId,
      },
    });

  const {
    data: collectionData,
    isLoading: areCollectionsLoading,
    refetch: refetchCollections,
  } = useQuery({
    queryKey: ["user_collections", userId],
    queryFn: () => getCollections({ userId }),
    onError: (err: Error) => {
      console.error(err.message);
    },
    enabled: !!userId,
  });

  return (
    <View className="w-full flex flex-1 justify-between">
      <SafeAreaView className="w-full flex flex-1">
        <ScrollView
          onScroll={({
            nativeEvent: { layoutMeasurement, contentOffset, contentSize },
          }) => {
            const isNearBottom =
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - 20;
            if (isNearBottom) {
              fetchNextPage();
            }
          }}
          scrollEventThrottle={400}
        >
          <View className="flex items-center mt-16">
            <Image
              className="w-48 h-48 mt-4 rounded-full"
              source={
                !user?.image
                  ? require("../../assets/profile.jpg")
                  : { uri: user.image }
              }
            />
            <Text className="mb-2 text-lg font-semibold">@{userName}</Text>
            <View className="flex flex-row gap-2">
              <Text>{user?.postCount ?? 0} images</Text>
              <Text>{user?.collectionCount ?? 0} collections</Text>
            </View>
            <View className="flex flex-row gap-2 m-4 w-full justify-center">
              <Button
                className={`py-0 ${
                  currentView === "created" ? "bg-indigo-900" : "bg-transparent"
                }`}
                onPress={() => setCurrentView("created")}
              >
                <Text
                  className={`text-base ${
                    currentView === "created"
                      ? "text-slate-50"
                      : "text-indigo-900"
                  }`}
                >
                  Created
                </Text>
              </Button>
              <Button
                className={`py-0 ${
                  currentView === "collections"
                    ? "bg-indigo-900"
                    : "bg-transparent"
                }`}
                onPress={() => setCurrentView("collections")}
              >
                <Text
                  className={`text-base ${
                    currentView === "collections"
                      ? "text-slate-50"
                      : "text-indigo-900"
                  }`}
                >
                  Collections
                </Text>
              </Button>
            </View>
            <TopNavBar value={search} onChangeText={setSearch} />
            {currentView === "created" && <CreatedView posts={posts ?? []} />}
            {currentView === "collections" && (
              <CollectionView collections={collectionData?.collections ?? []} search={search}/>
            )}
            {isFetchingNextPage && (
              <ActivityIndicator
                size="large"
                color="#312E81"
                className="android:py-4 ios:py-2"
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const CreatedView = ({ posts }: { posts: Post[] }) => {
  return (
    <View className="w-full flex flex-row flex-wrap justify-evenly gap-y-1 my-1">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="rounded-lg h-[48vw] aspect-square"
          post={post}
        />
      ))}
      {posts.length % 2 === 1 && (
        <View className="rounded-lg h-[48vw] aspect-square" />
      )}
    </View>
  );
};

const CollectionView = (
  { collections, search}: { collections: Collection[], search: string }
) => {

  let visibleCollections = []

  if (search !== undefined) {
    for (let i = 0; i < collections.length; i++) {
      if (collections[i].name.includes(search)) {
        visibleCollections.push(collections[i])
      }
    }
  }

  collections = visibleCollections

  return (
    <View className="w-full flex flex-row flex-wrap justify-evenly gap-y-1 my-1">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          // className=""
          collection={collection}
        />
      ))}
      {collections.length % 2 === 1 && (
        <View className="rounded-lg h-[48vw] aspect-square" />
      )}
    </View>
  );
};
