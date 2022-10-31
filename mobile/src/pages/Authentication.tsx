import { StatusBar } from 'expo-status-bar';
import { Button, View } from 'react-native';

export default function Authentication({navigation}) {
  return (
    <View className="flex-1 flex justify-center items-center">
      <View className="flex-1 w-full">
        <View className="rounded-full flex-1 m-16 bg-slate-400">
        </View>
      </View>
      <View className="flex-1 w-full">
        <Button 
        title="Login" 
        onPress={() => navigation.navigate("Login")}
        color="#211D3A"/>
        <Button
        title="Sign Up"
        onPress={() => navigation.navigate("Register")}
        color="#211D3A"/>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}