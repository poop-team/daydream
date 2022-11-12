import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { TextInput, Text, Pressable, View, ScrollView } from "react-native";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/Ionicons";
import { login } from "../helpers/mutate";
import { storeAuthSession } from "../utils/storage";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  //# region Styles

  const textInputViewStyle = "mx-auto rounded-lg bg-slate-300 w-80 h-12 mb-5 items-start justify-center";
  const textStyle = "font-bold text-xl";
  const textInputStyle = "ml-3 w-80";

  //# endregion

  return (
    <View className="flex-1 w-full">
      <View className="w-full flex-row place-content-start mt-16 ml-2">
        <Pressable>
          <Icon
            size={40}
            name="arrow-back-outline"
            onPress={() => navigation.navigate("Home")}
          />
        </Pressable>
      </View>
      <ScrollView className="w-screen h-screen position-relative scroll">
        <View className="flex-1 flex mx-auto">
          <Text className={`mt-8 mb-3 ${textStyle}`}>
            Enter your username:
          </Text>

          <View className={textInputViewStyle}>
            <TextInput
              className={textInputStyle}
              placeholder="*Enter Username"
              placeholderTextColor="#000000"
              onChangeText={setUsername}
            />
          </View>

          <Text className={`mb-3 ${textStyle}`}>Enter a password:</Text>

          <View className={textInputViewStyle}>
            <TextInput
              className={textInputStyle}
              secureTextEntry={true}
              placeholder="*Enter Password"
              placeholderTextColor="#000000"
              onChangeText={setPassword}
            />
          </View>
          <Pressable className="items-center justify-center">
            <Text className={`my-10 text-indigo-900 ${textStyle}`}>
              Forgot your password?
            </Text>
          </Pressable>
        </View>
        <View className="flex-1 w-full items-center position-relative justify-center">
          <Button
            name="Login"
            className="mb-10"
            disabled={isPending}
            onPress={() => {
              setIsPending(true);
              login(username, password)
                .then(async (data) => {
                  if (data) {
                    storeAuthSession(data);
                    await navigation.navigate("FeedPage");
                    setIsPending(false);
                  }
                })
                .catch((err: Error) => {
                  //toast.error(err.message);
                  setIsPending(false);
                });
            }}
          />
          <Pressable>
            <Text
              className={`ml-0 text-indigo-900 ${textStyle}`}
              onPress={() => navigation.navigate("Register")}
            >
              Create Account
            </Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}
