import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styled } from 'nativewind';

const StyledView = styled(View);

export default function BottomNavBar() {

  //# region Styles

  const pressStyle =
    "active:rounded-full active:bg-indigo-800/70 active:opacity-95 h-10 w-20 items-center justify-center";
  const iosStyle = "w-full py-10 bg-slate-200 flex-row items-center justify-around absolute bottom-0 rounded-tl-lg rounded-tr-lg h-12";
  const androidStyle = "w-full bg-slate-200 flex-row items-center justify-around absolute bottom-0 rounded-tl-lg rounded-tr-lg h-12";

  //# endregion

  return (
    <StyledView className={`
      ios: ${iosStyle}
      android: ${androidStyle}`}>
      <Pressable className={pressStyle} onPress={() => {}}>
        <Ionicons name="home" size={30} color="black" />
      </Pressable>
      <Pressable className={pressStyle} onPress={() => {}}>
        <Ionicons name="add-circle" size={30} color="black" />
      </Pressable>
      <Pressable className={pressStyle} onPress={() => {}}>
        <Ionicons name="md-person-circle" size={30} color="black" />
      </Pressable>
    </StyledView>
  );
}
