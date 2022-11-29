import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/Button";

export default function ForgotPassword({ navigation }) {
    const [userEmail, setUserEmail] = useState("");

    return (
        <View className="flex-1 flex">
            <View className="items-start flex-row place-content-start mt-16 ml-2">
                <Pressable>
                    <Icon
                        size={40}
                        name="arrow-back-outline"
                        onPress={() => navigation.navigate("Home")}
                    />
                </Pressable>
            </View>
            <View className="mt-60 m-8 rounded-md content-center justify-center items-center border-4  border-indigo-900">
                <View className="m-3 mb-0">
                    <Icon size={50} name="lock-closed-outline" />
                </View>
                <Text className="m-2 font-bold text-xl">Trouble logging in?</Text>
                <Text className="text-lg text-center">Enter your email and we'll send you a link to get back into your account!</Text>
                <TextInput
                    className="w-64 flex m-5 h-10 text-lg pl-2 items-start justify-center rounded-lg bg-slate-300 width-44"
                    placeholder="Email"
                    textAlign="left"
                    placeholderTextColor="#000000"
                    onChangeText={setUserEmail}/>
                <Button
                name="Send login link"
                className="mb-5" />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}