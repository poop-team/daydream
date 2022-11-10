import { Text, View } from "react-native";
import BottomNavBar from '../BottomNavBar';

export default function Dummypage({ text, navigation }) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>{text}</Text>
        <BottomNavBar navigation = {navigation}/>
    </View>
  );
}
