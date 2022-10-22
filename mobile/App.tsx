import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  BottomNavbar  from './src/components/navbar';
import FeedPage from './src/feedPage';
export default function App() {
  const value: string = "hello, world";
  return (

      <FeedPage />
    
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
