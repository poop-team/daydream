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

interface Props {
  collection?: Collection;
}

function CollectionCard({ collection }: Props) {
  const [currentCollection, setCurrentCollection] = useState(collection);
  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
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
            <View className="flex flex-row justify-center">
              <Text>
                {`${currentCollection.postCount} ${
                  currentCollection.postCount === 1 ? "post" : "posts"
                }`}
              </Text>
            </View>
            <ScrollView>
              <View className="w-full flex flex-row flex-wrap justify-evenly gap-y-2 my-4">
                {currentCollection.posts.map((post) => (
                  <Card
                    key={post.id}
                    className="rounded-lg h-[40vw] aspect-square"
                    post={post}
                  />
                ))}
                {currentCollection.posts.length % 2 === 1 && (
                  <View className="rounded-lg h-[40vw] aspect-square" />
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View
        key={collection.id}
        className="flex aspect-square rounded-lg h-[48vw]"
      >
        {collection.posts[0]?.imageURL ? (
          <>
            <Pressable
              onPress={() => {
                setCurrentCollection(collection);
                setModalVisible(true);
              }}
            >
              <Image
                source={{ uri: collection.posts[0]?.imageURL }}
                style={{ minHeight: screenWidth * 0.48 - 48 }}
              />
              <Text className="font-bold">{collection.name}</Text>
              <Text>{collection.postCount} saved</Text>
            </Pressable>
          </>
        ) : (
          <>
            <View className="flex flex-1 items-center justify-center bg-slate-300/80">
              <Text className="text-xl font-semibold text-slate-600">
                Nothing saved yet
              </Text>
            </View>
            <Text className="font-bold">{collection.name}</Text>
            <Text>{collection.posts.length} saved</Text>
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
