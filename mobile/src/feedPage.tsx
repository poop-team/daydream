import { StyleSheet, Text, View, Image } from 'react-native';
import  BottomNavbar  from './components/navbar';
import Card from './components/pictureCardComponent';


export default function FeedPage() {
    const value: string = "hello, world"; 
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>     
          <Card />
          <Card />
        </View >
        <BottomNavbar />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    
    cardContainer: {
      position: 'relative',
      bottom: 0,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  });
  