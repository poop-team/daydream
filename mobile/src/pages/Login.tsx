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
      <ScrollView className="w-screen h-screen position-relative scroll ">

      <View className="flex-1 flex mx-auto">
        <Text className=" mt-8 font-bold mb-3 text-xl">
          Enter your username:
        </Text>

        <View className=" mx-auto rounded-lg bg-slate-300 w-80 h-12 mb-5 items-start justify-center">
          <TextInput
            className="ml-3 w-80"
            placeholder="*Enter Username"
            placeholderTextColor="#000000"
            onChangeText={setUsername}
          />
        </View>

        <Text className=" font-bold mb-3 text-xl">Enter a password:</Text>

        <View className="mx-auto rounded-lg bg-slate-300 w-80 mb-5 h-12 items-start justify-center">
          <TextInput
            className="ml-3 w-80"
            secureTextEntry={true}
            placeholder="*Enter Password"
            placeholderTextColor="#000000"
            onChangeText={setPassword}
          />
        </View>
        <Pressable className="items-center justify-center">
          <Text className="text-xl my-10 text-indigo-900 font-bold">
            Forgot your password?
          </Text>
        </Pressable>
      </View>
      <View className="flex-1 w-full items-center position-relative justify-center">
        <Button
          name="Login"
          className="mb-10"
          onPress={() => {
            login(username, password)
              .then(async (data) => {
                if (data) {
                  storeAuthSession(data);
                  await navigation.navigate("FeedPage");
                }
              })
              .catch((err: Error) => {
                //toast.error(err.message);
              });
          }}
        />
        <Pressable>
          <Text
            className="ml-0 text-xl text-indigo-900 font-bold"
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
