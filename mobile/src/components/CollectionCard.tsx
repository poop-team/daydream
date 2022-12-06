import {Image, Modal, Pressable, Text, View} from "react-native";
import Card from "./Card";
import Collection from "../types/collection.type";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  collection?: Collection;
}

function CollectionCard({
  collection,
}: Props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }
      }>
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
          <View>
            {collection.posts.map((post) => (
              <Card
                key={post.id}
                className="rounded-lg h-[48vw] aspect-square"
                post={post}
              />
            ))}
          </View>
        </View>
      </Modal>
      <View key={collection.id} className="flex aspect-square rounded-lg h-[48vw]">
        {collection.posts[0]?.imageURL ?
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              source={{uri: collection.posts[0]?.imageURL}}
              className="h-[77%]"
            />
          </Pressable>:
          <View className="flex flex-1 items-center justify-center bg-slate-300/80">
            <Text className="text-xl font-semibold text-slate-600"> {/*TOOD not displaying box anymore*/}
              Nothing saved yet
            </Text>
          </View>
        }
        <Text className="font-bold">
          {collection.name}
        </Text>
        <Text>
          {collection.posts.length} saved
        </Text>
      </View>
    </View>
  )
}

export default CollectionCard
