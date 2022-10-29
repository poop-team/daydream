import { StatusBar } from 'expo-status-bar';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <View className="flex-1 flex justify-center items-center bg-slate-400">
      <View className="flex-1 w-full bg-red-400">
        <View className="rounded-full flex-1 m-16 bg-slate-400">
        </View>
      </View>
      <View className="flex-1 w-full bg-blue-400">
        <Button title="Login" color="#211D3A"/>
        <Button title="Sign Up" color="#211D3A"/>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}