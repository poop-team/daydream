import {styled} from "nativewind";
import React, {useEffect, useState} from "react";
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  View,
  Modal,
  Text,
  StyleSheet,
} from "react-native";
import Button from "./Button";
import Icon from "react-native-vector-icons/Ionicons";
import useLikePost from "../hooks/useLikePost";
import {getAuthSession} from "../utils/storage";
import {useQuery} from "@tanstack/react-query";
import {getCollections, getUser} from "../requests/fetch";
import AddToCollectionCard from "./AddToCollectionCard";

//fixme: I will probably have to break card up unto a sub-component like the web version and then url will be required
interface Props {
  style?: StyleProp<ImageStyle>;
  post?: any;
}

/**
 * @url url of the image string (default: muppet (<3) )
 * @styles width & height (default h-96, w-11/12)
 * @data data from the useInfiniteQueryPosts hook
 */

function Card({style, post}: Props) {

  //these spaces are here so that the user of this api cannot mess it up if they forget to add a space
  const [userId, setUserId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [atcCardVisible, showAtCCard] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const {mutateLikeChange, isLiked, likeCount} = useLikePost({
    postId: post?.id,
    initialLikeCount: post?.likeCount,
    initialIsLiked: post?.isLiked,
  });

  {/*FIXME REFACTOR: JAN START*/}
  useEffect(() => {
    (async () => {
      const { userId } = await getAuthSession();
      setUserId(userId);
    })();
  }, []);

  const {
    data: collectionData
  } = useQuery({
    queryKey: ["user_collections", userId],
    queryFn: () => getCollections({ userId }),
    onError: (err: Error) => {
      console.error(err.message);
    },
    enabled: !!userId,
  });

  const collections = collectionData?.collections ?? []
  {/*FIXME REFACTOR: JAN STOP*/}

  let baseStyle = "rounded-lg mt-5 mx-auto";

  const url =
    post?.imageURL ||
    "https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F9d532691aa47444996dba0e889b6a728.png&w=1080&q=90";

  return (
    <View>
      {/*FIXME REFACTOR: JAN START*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={atcCardVisible}
        onRequestClose={() => {
          showAtCCard(!atcCardVisible);
        }}
      >
        <View style={styles.modalView}>
          <View className="h-[90%] bg-white my-auto rounded-lg">
            <View className="w-full flex-row ml-2 mt-2 justify-start">
              <Pressable>
                <Icon
                  size={40}
                  name="arrow-back-outline"
                  onPress={() => {
                    showAtCCard(!atcCardVisible);
                  }}
                />
              </Pressable>
            </View>
            <View className="h-[92%] bg-white my-auto rounded-lg">
              <View className="w-full flex flex-row flex-wrap justify-evenly gap-y-1 my-1">
                {collections.map((collection) => (
                  <AddToCollectionCard
                    postId={selectedPost}
                    key={collection.id}
                    collection={collection}
                  />
                ))}
                {collections.length % 2 === 1 && (
                  <View className="rounded-lg h-[48vw] aspect-square" />
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/*FIXME REFACTOR: JAN STOP*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View className="flex items-center justify-center bg-white my-auto rounded-lg">
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
            <Image className="w-11/12 h-96 rounded-lg" source={{uri: url}}/>
            <View className="flex w-full flex-col items-center gap-2 p-4 md:p-6 lg:gap-4">
              <View className="flex-row align-middle justify-between">
                <View className="w-5/6 flex-row c">
                  <Text className="">By: </Text>
                  <Text className="font-black">{post?.author.name}</Text>
                </View>
                {/* these are here to prevent crash if null*/}
                <Text className="">{likeCount ?? 0}</Text>
                {/*FIXME: LIKE COUNTER NEEDS TO BE UPDATEABLE*/}
                <Pressable onPress={() => mutateLikeChange(!isLiked)}>
                  {isLiked ? (
                    <Icon name="heart" color="red" size={20}/>
                  ) : (
                    <Icon name="heart-outline" size={20}/>
                  )}
                </Pressable>
              </View>
              <Text>{post?.prompt}</Text>
              <Button pilled onPress={() => {
                showAtCCard(!atcCardVisible)
                setSelectedPost(post.id)
              }}>
                <View className="flex-row">
                  <Text className="text-white">Add to Collection </Text>
                  <Icon name="albums-outline" size={20} color="white"/>
                </View>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image
          source={{uri: url}}
          className={`${baseStyle} h-96 w-11/12`}
          style={style}
        />
      </Pressable>
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

export default styled(Card);
