import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import { View } from 'react-native';

export default function Authentication({ navigation }) {
  return (
    <View className='flex-1 flex justify-center items-center'>
      <View className='flex-1 w-full'>
        <View className='rounded-full flex-1 m-16 bg-slate-400'>
        </View>
      </View>
      <View className='flex-1 w-full justify-center items-center'>
        <Button 
          name='Login' 
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          name='Sign Up'
          onPress={() => navigation.navigate('Register')}
          className='mt-10'
        />
      </View>
      <StatusBar style='auto'/>
    </View>
  );
}
