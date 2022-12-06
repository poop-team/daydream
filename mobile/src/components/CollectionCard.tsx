import { Dimensions, Image, Modal, Pressable, Text, View } from "react-native";
import Card from "./Card";
import Collection from "../types/collection.type";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";

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
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="w-full h-full bg-white">
          <View className="w-full flex-row place-content-start ml-2">
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
          <View />
          <View>
            {/*
            Dear Rob,

            !author.name == crash
            Left this is a reminder of what to investigate tomorrow.

            * console.log(collection) doesn't show an author name.
            * overall idea of this <view>:
              - take collection
              - iterate through the Posts[] stored in it
              - display the image cards, as seen in src/pages/ProfilePage.tsx : 165

            - Jan
            */}
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
                console.log(collection);
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
