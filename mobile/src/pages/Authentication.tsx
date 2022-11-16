import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import { Image, View } from "react-native";

export default function Authentication({ navigation }) {
  return (
    <View className="flex-1 flex justify-center items-center bg-white">
      <View className="flex-1 mx-20 my-20">
        <Image className="flex-1 min-w-fit max-w-sm resize" source={require('../images/daydream_logo_words.png')}/>
      </View>
      <View className="flex-1 w-full items-center">
        <Button name="Login" onPress={() => navigation.navigate("Login")} />
        <Button
          name="Sign Up"
          onPress={() => navigation.navigate("Register")}
          className="mt-16"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
