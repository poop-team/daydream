import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Card from "./Card";
import Collection from "../types/collection.type";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { styled } from "nativewind";
import useDebounce from "../hooks/useDebounce";
import useInfiniteQueryPosts from "../hooks/useInfiniteQueryPosts";
import { ActivityIndicator } from "react-native";

interface Props {
  collection?: Collection;
}

function CollectionCard({ collection }: Props) {
  const [currentCollection, setCurrentCollection] = useState(collection);
  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { posts, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQueryPosts({
      searchValue: debouncedSearch,
      limit: 8,
      key: "collection_posts",
      collectionId: currentCollection.id,
      recentOnly: false,
    });
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View className="h-4/6 bg-white my-auto rounded-lg">
            <View className="w-full flex-row ml-2 mt-2 justify-start">
              <Pressable>
                <Icon
                  size={40}
                  name="arrow-back-outline"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </Pressable>
            </View>
            <View className="flex flex-row justify-center">
              <Text className="font-bold text-xl mt-1">
                {currentCollection.name}
              </Text>
            </View>
            <View className="flex flex-row justify-center mb-3">
              <Text>
                {`${currentCollection.postCount} ${
                  currentCollection.postCount === 1 ? "post" : "posts"
                }`}
              </Text>
            </View>
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
              <View className="w-full flex flex-row flex-wrap justify-evenly gap-y-2 my-4">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="rounded-lg h-[40vw] aspect-square"
                    post={post}
                  />
                ))}
                {posts.length % 2 === 1 && (
                  <View className="rounded-lg h-[40vw] aspect-square" />
                )}
              </View>
              <View>
                {isFetchingNextPage && (
                  <ActivityIndicator
                    size="large"
                    color="#312E81"
                    className="android:py-4 ios:py-2"
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View
        key={collection.id}
        className="flex aspect-square rounded-l h-[48vw]"
      >
        {collection.posts[0]?.imageURL ? (
          <>
            <Pressable
              onPress={() => {
                setCurrentCollection(collection);
                setModalVisible(true);
              }}
            >
              <View className="bg-slate-200 rounded-lg">
                <Image
                  className="flex aspect-auto w-full h-[35vw] rounded-lg"
                  source={{ uri: collection.posts[0]?.imageURL }}
                  style={{ minHeight: screenWidth * 0.48 - 48 }}
                />
                <View className="flex-row justify-between mx-2">
                  <Text className="font-bold">
                    {collection.name.length > 6
                      ? collection.name.slice(0, 6) + ".."
                      : collection.name}
                  </Text>
                  <Text>{collection.postCount} saved</Text>
                </View>
              </View>
            </Pressable>
          </>
        ) : (
          <>
            <View className="bg-slate-200 rounded-lg">
              <View className="flex aspect-auto w-full h-[35vw] mx-auto rounded-lg items-center justify-center bg-slate-300/80">
                <Text className="text-xl font-semibold text-slate-600 rounded-md">
                  Nothing saved yet
                </Text>
              </View>
              <View className="flex-row justify-between mx-2">
                <Text className="font-bold">
                  {collection.name.length > 6
                    ? collection.name.slice(0, 6) + ".."
                    : collection.name}
                </Text>
                <Text> {collection.postCount} saved</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    height: "100%",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "#000",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default styled(CollectionCard);
