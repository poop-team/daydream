import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import { View } from 'react-native';

export default function Authentication({ navigation }) {

  //# region Styles

  const baseStyle = "justify-center items-center";
  const viewStyle = "flex-1 w-full";

  //# endregion

  return (
    <View className={`flex-1 flex ${baseStyle}`}>
      <View className={`${viewStyle}`}>
        <View className="rounded-full flex-1 m-16 bg-slate-400"></View>
      </View>
      <View className={`${viewStyle} ${baseStyle}`}>
        <Button name="Login" onPress={() => navigation.navigate("Login")} />
        <Button
          name="Sign Up"
          onPress={() => navigation.navigate("Register")}
          className="mt-10"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
