import { Dimensions, Image, Modal, Pressable, Text, View } from "react-native";
import Card from "./Card";
import Collection from "../types/collection.type";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

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
        <View className="w-full bg-white my-auto">
          <View className="w-full flex-row ml-2 justify-start">
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
                currentCollection.postCount % 2 == 1 ? "post" : "posts"
              }`}
            </Text>
          </View>
          <View>
            {currentCollection.posts.map((post) => (
                  <Card
                    key={post.id}
                    className="rounded-lg h-[48vw] aspect-square"
                    post={post}
                  />
            ))}
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
              <Text>{collection.posts.length} saved</Text>
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

export default CollectionCard;
