import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TextInput, Text, Pressable, View } from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View className='flex-1 w-full'>
            <View className='w-full flex-row place-content-start mt-16 ml-2'>
                <Pressable>
                    <Icon 
                        size={45}
                        name='arrow-back-outline'
                        onPress={() => navigation.navigate('Home')} />
                </Pressable>
            </View>
            <View className='flex-1 flex'>

                <Text className='ml-8 mt-8 font-bold mb-3 text-xl'>Enter your username:</Text>

                <View className=' ml-8 rounded-lg bg-slate-300 w-80 h-12 mb-5 items-start justify-center'>
                    <TextInput
                        className='ml-3'
                        placeholder='*Enter Username'
                        placeholderTextColor='#000000'
                        onChangeText={setUsername} />
                </View>

                <Text className='ml-8 font-bold mb-3 text-xl'>Enter a password:</Text>

                <View className='ml-8 rounded-lg bg-slate-300 w-80 mb-5 h-12 items-start justify-center'>
                    <TextInput
                        className='ml-3'
                        secureTextEntry={true}
                        placeholder='*Enter Password'
                        placeholderTextColor='#000000'
                        onChangeText={setPassword} />
                </View>
                <Pressable className='items-center justify-center'>
                    <Text className='text-xl  text-indigo-900 font-bold'>Forgot your password?</Text>
                </Pressable>
            </View>
            <View className='flex-1 w-full items-center justify-center'>
                <Button name='Login' className='mb-10' />
                <Pressable>
                    <Text 
                        className='ml-0 text-xl text-indigo-900 font-bold'
                        onPress={() => navigation.navigate('Register')}>Create Account</Text>
                </Pressable>
            </View>
            <StatusBar style='auto'/>
        </View>
    );
}
