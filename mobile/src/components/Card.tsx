import { styled } from "nativewind";
import React from "react";
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  View,
  Modal,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

//fixme: I will probably have to break card up unto a sub-component like the web version and then url will be required
interface Props {
  url?: string;
  style?: StyleProp<ImageStyle>;
}
/**
 * @url url of the image string (default: muppet (<3) )
 * @styles width & height (default h-96, w-11/12)
 */
function Card({
  url = "https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F9d532691aa47444996dba0e889b6a728.png&w=1080&q=90",
  style,
}: Props) {
  //these spaces are here so that the user of this api cannot mess it up if they forget to add a space
  const [modalVisible, setModalVisible] = React.useState(false);
  console.log("modalVisible", modalVisible);
  let baseStyle = "rounded-lg mt-5 mx-auto";
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          className="flex items-center justify-center bg-white bg-opacity-50 h-full w-full"
          onPress={() => {
            setModalVisible(!modalVisible);
            console.log("1");
          }}
        >
          <Image className="w-11/12 h-96 rounded-lg" source={{ uri: url }} />
          <Text>by {}</Text>
          <Pressable>
            <Text>Hide Modal</Text>
          </Pressable>
        </TouchableOpacity>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image
          source={{ uri: url }}
          className={`${baseStyle} h-96 w-11/12`}
          style={style}
        />
      </Pressable>
    </View>
  );
}

export default styled(Card);
