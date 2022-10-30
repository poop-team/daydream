import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TextInput, Text, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <View className='flex-1 w-full'>
            <View className='w-full flex-row place-content-start mt-16 ml-2'>
                <Pressable>
                    <Icon size={45} name='arrow-back-outline' />
                </Pressable>
            </View>
            <View className='flex-1 flex ml-8 mt-8'>

                <Text className='font-bold mb-3 text-xl'>Enter your email:</Text>

                <View className='rounded-lg bg-slate-300 w-80 h-12 mb-5 items-start justify-center'>
                    <TextInput
                        className='ml-3'
                        placeholder='*Email'
                        placeholderTextColor='#000000'
                        onChangeText={setEmail} />
                </View>

                <Text className='font-bold mb-3 text-xl'>Enter a username:</Text>

                <View className='rounded-lg bg-slate-300 w-80 h-12 mb-5 items-start justify-center'>
                    <TextInput
                        className='ml-3'
                        placeholder='*Username'
                        placeholderTextColor='#000000'
                        onChangeText={setUsername} />
                </View>

                <Text className='font-bold mb-3 text-xl'>Enter a password:</Text>

                <View className={"rounded-lg bg-slate-300 w-80 mb-5 h-12 items-start justify-center"}>
                    <TextInput
                        className={"ml-3"}
                        secureTextEntry={true}
                        placeholder="*Password"
                        placeholderTextColor="#000000"
                        onChangeText={setPassword} />
                </View>

                <Text className='font-bold mb-3 text-xl'>Retype Password:</Text>

                <View className='rounded-lg bg-slate-300 w-80 h-12 items-start justify-center'>
                    <TextInput
                        className='ml-3'
                        secureTextEntry={true}
                        placeholder='*Password'
                        placeholderTextColor='#000000'
                        onChangeText={setConfirmPassword} />
                </View>

            </View>
            <View className='flex-1 w-full items-center justify-center'>
                <Pressable>
                    <Text className='ml-0 text-xl text-indigo-900 font-bold'>Save</Text>
                </Pressable>
            </View>
            <StatusBar style='auto' />
        </View>
    );
}
