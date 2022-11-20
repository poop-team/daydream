import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { TextInput, Text, Pressable, View, ScrollView } from "react-native";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/Ionicons";
import { register } from "../helpers/mutate";

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
  // # region Styles

  const textStyle = "font-bold mb-3 text-xl";
  const textInputViewStyle =
    "rounded-lg bg-slate-300 w-80 h-12 mb-5 items-start justify-center";
  const textInputStyle = "ml-3 w-80";

  // # endregion

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

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const isDataValid =
    password === confirmPassword &&
    email.includes("@") &&
    username.length > 0 &&
    password.length > 7;
  const errorTextStyle = "text-red-500 mx-auto font-extrabold";

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
          <LabelAndInput
            labelText="Enter your email:"
            value={email}
            placeholder="*Email"
            onChangeText={setEmail}
          />

          <Text className={errorTextStyle}>
            {email.includes("@") ? "" : "Please enter a valid email."}
          </Text>

          <LabelAndInput
            labelText="Enter a username:"
            value={username}
            placeholder="*Username"
            onChangeText={setUsername}
          />

          <Text className={errorTextStyle}>
            {username.length > 0 ? "" : "Please enter a name."}
          </Text>

          <LabelAndInput
            labelText="Enter a password:"
            value={password}
            placeholder="*Password"
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <LabelAndInput
            labelText="Confirm Password"
            value={confirmPassword}
            placeholder="*Password"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
          />

          <Text className={errorTextStyle}>
            {error}{" "}
            {password === confirmPassword ? "" : "Passwords do not match"}
          </Text>
          <Text className={errorTextStyle}>
            {password.length > 7
              ? ""
              : "Password must be at least 8 characters"}
          </Text>
        </View>
        <View className="flex-1 w-full items-center my-12 justify-center">
          <Pressable>
            <Button
              name="Save"
              className="ml-0 text-xl text-indigo-900 font-bold"
              disabled={isPending || !isDataValid}
              onPress={() => {
                setIsPending(true);
                register(username, email, password)
                  .then(() => {
                    //toast.success("Account created successfully!");
                    navigation.navigate("Login");
                    setIsPending(false);
                  })
                  .catch((err: Error) => {
                    setError(err.message);
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
