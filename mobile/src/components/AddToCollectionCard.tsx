import {
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import Collection from "../types/collection.type";
import {styled} from "nativewind";
import {addPostToCollection} from "../requests/mutate";

interface Props {
  postId: string;
  collection?: Collection;
}

function AddToCollectionCard({postId, collection}: Props) {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View>
      <View
        key={collection.id}
        className="flex aspect-square rounded-lg h-[48vw]"
      >
        {collection.posts[0]?.imageURL ? (
          <>
            <Pressable
              onPress={() => {
                //FIXME: added logic to check if post is already in collection and either add/delete respectively
                console.log("something1")
              }}
            >
              <Image
                source={{uri: collection.posts[0]?.imageURL}}
                style={{minHeight: screenWidth * 0.48 - 48}}
              />
              <Text className="font-bold">{collection.name}</Text>
              <Text>{collection.postCount} saved</Text>
            </Pressable>
          </>
        ) : (
          <>
            <View className="flex flex-1 items-center justify-center bg-slate-300/80">
              <Pressable
                onPress={() => {
                  //FIXME: added logic to check if post is already in collection and either add/delete respectively
                  console.log("something2")
                }}
              >
                <Text className="text-xl font-semibold text-slate-600">
                  Nothing saved yet
                </Text>
              </Pressable>
            </View>
            <Text className="font-bold">{collection.name}</Text>
            <Text>{collection.posts.length} saved</Text>
          </>
        )}
      </View>
    </View>
  );
}

export default styled(AddToCollectionCard);
