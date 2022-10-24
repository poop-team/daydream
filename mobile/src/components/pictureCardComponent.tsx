import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

export default function Card() {
    const value: string = "hello, world";
    let image = 'https://mcdn.wallpapersafari.com/medium/83/13/5SYoup.jpg';
    let description = "This is a placeholder description";
    return (
      <Image source={{uri: image}}
       style={styles.container} />

    );
  }
  
  const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        width: '90%',
        height: '42%',
        marginTop: 20,
    }, 
  
    image: {

    },
  
  });
  