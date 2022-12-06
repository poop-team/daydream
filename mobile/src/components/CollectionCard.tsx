import {Image, Pressable, Text, View} from "react-native";
import Card from "./Card";
import Collection from "../types/collection.type";

interface Props {
  collection?: Collection;
}

function CollectionCard({
                          collection,
                        }: Props) {
  return (
    <View key={collection.id} className="flex aspect-square rounded-lg h-[48vw]">
      <Pressable onPress={() =>
        {collection.posts.map((post) => (
          <Card
            key={post.id}
            className="rounded-lg h-[48vw] aspect-square"
            post={post}
          />
        ))}
      }>
        {collection.posts[0]?.imageURL ?
          <Image
            source={{uri: collection.posts[0]?.imageURL}}
            className="h-[77%]"
          /> :
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
      </Pressable>
    </View>
  )
}

export default CollectionCard