import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { TextInput, Text, Pressable, View, ScrollView } from "react-native";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/Ionicons";
import { register } from "../helpers/mutate";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  //# region Styles

  const inputClassName = "ml-3 w-80";
  const textStyle = "font-bold text-xl";
  const textInputViewStyle = "rounded-lg bg-slate-300 w-80 h-12 mb-5 items-start justify-center";

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
      <ScrollView className="w-screen h-screen position-relative scroll ">
        <View className="flex-1 flex mx-auto mt-8">
          <Text className={`${textStyle} mb-3`}>Enter your email:</Text>

          <View className={textInputViewStyle}>
            <TextInput
              className={inputClassName}
              placeholder="*Email"
              placeholderTextColor="#000000"
              onChangeText={setEmail}
            />
          </View>

          <Text className={`${textStyle} mb-3`}>Enter a username:</Text>

          <View className={textInputViewStyle}>
            <TextInput
              className={inputClassName}
              placeholder="*Username"
              placeholderTextColor="#000000"
              onChangeText={setUsername}
            />
          </View>

          <Text className={`${textStyle} mb-3`}>Enter a password:</Text>

          <View className={textInputViewStyle}>
            <TextInput
              className={inputClassName}
              secureTextEntry={true}
              placeholder="*Password"
              placeholderTextColor="#000000"
              onChangeText={setPassword}
            />
          </View>

          <Text className={`${textStyle} mb-3`}>Retype Password:</Text>

          <View className={textInputViewStyle}>
            <TextInput
              className={inputClassName}
              secureTextEntry={true}
              placeholder="*Password"
              placeholderTextColor="#000000"
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>
        <View className="flex-1 w-full items-center my-12 justify-center">
          <Pressable>
            <Button
              name="Save"
              className={`ml-0 text-indigo-900 ${textStyle}`}
              disabled={isPending}
              onPress={() => {
                setIsPending(true);
                register(username, email, password)
                  .then(() => {
                    //toast.success("Account created successfully!");
                    navigation.navigate("Login");
                    setIsPending(false);
                  })
                  .catch((err: Error) => {
                    //toast.error(err.message);
                    setIsPending(false);
                  });
              }}
            />
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}
