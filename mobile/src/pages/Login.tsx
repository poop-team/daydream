import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { Button, TextInput, Text, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className={'flex-1 w-full'}>
      <View className={'w-full flex-row place-content-start mt-16 ml-2'}>
        <Pressable>
          <Icon size={45} name="arrow-back-outline" />
        </Pressable>
      </View>
      <View className={"flex-1 flex ml-8 mt-8"}>

        <Text className={"font-bold mb-3 text-xl"}>Enter your username:</Text>

        <View className={"rounded-lg bg-slate-300 w-80 h-12 mb-5 items-start justify-center"}>
          <TextInput
            className={"ml-3"}
            placeholder="*Enter Username"
            placeholderTextColor="#000000"
            onChangeText={(value) => setUsername(value)} />
        </View>

        <Text className={"font-bold mb-3 text-xl"}>Enter a password:</Text>

        <View className={"rounded-lg bg-slate-300 w-80 mb-5 h-12 items-start justify-center"}>
          <TextInput
            className={"ml-3"}
            secureTextEntry={true}
            placeholder="*Enter Password"
            placeholderTextColor="#000000"
            onChangeText={(value) => setPassword(value)} />
        </View>

        </View>
        <View className={"flex-1 w-full items-center justify-center"}>
          <Pressable>
            <Text className={"ml-0 text-xl text-indigo-900 font-bold"}>Forgot your password?</Text>
          </Pressable>
          <Button title="Login"/>
          <Pressable>
            <Text className={"ml-0 text-xl text-indigo-900 font-bold"}>Create Account</Text>
          </Pressable>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}
