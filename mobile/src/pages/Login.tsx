import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { TextInput, Text, Pressable, View, ScrollView } from "react-native";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/Ionicons";
import { login } from "../helpers/mutate";
import { storeAuthSession } from "../utils/storage";

interface Props {
  value: string;
  labelText: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (value: string) => void;
}

function LabelAndInput({
  value,
  labelText,
  placeholder,
  secureTextEntry,
  onChangeText,
}: Props) {
  //# region Styles

  const textInputViewStyle =
    "mx-auto rounded-lg bg-slate-300 w-80 h-12 mb-5 items-start justify-center";
  const textStyle = "mt-6 mb-3 font-bold text-xl";
  const textInputStyle = "ml-3 w-80";

  //# endregion

  return (
    <>
      <Text className={textStyle}>{labelText}</Text>

      <View className={textInputViewStyle}>
        <TextInput
          className={textInputStyle}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#000000"
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
        />
      </View>
    </>
  );
}

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [invalidCount, setInvalidCount] = useState(0);

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
          <LabelAndInput
            labelText="Enter your username:"
            value={username}
            placeholder="*Enter Username"
            onChangeText={setUsername}
          />

          <LabelAndInput
            labelText="Enter your password:"
            value={password}
            placeholder="*Enter Password"
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <Pressable className="items-center justify-center">
            <Text className="my-10 text-indigo-900 font-bold text-xl">
              Forgot your password?
            </Text>
          </Pressable>
        </View>
        <View className="flex-1 w-full items-center position-relative justify-center">
          <Text className="text-red-500 mx-auto font-extrabold">
            {invalidCount >= 5
              ? "Too many failed attempts, try again later"
              : ""}
          </Text>
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
                    setInvalidCount(0);
                  }
                })
                .catch((err: Error) => {
                  //toast.error(err.message);
                  setIsPending(false);
                  setInvalidCount(invalidCount + 1);
                });
            }}
          />
          <Pressable>
            <Text
              className="ml-0 text-indigo-900 font-bold text-xl"
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
