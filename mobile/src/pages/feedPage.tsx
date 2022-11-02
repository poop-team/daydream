import {
  View,
  ScrollView,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import Card from "../components/Card";
import TopNavBar from "../components/TopNavBar";

export default function FeedPage() {
  return (
    <View className="flex-1 items-center justify-center scroll">
      <TopNavBar value="" onChangeText={() => {}} />
      <View className="position-relative w-screen h-screen items-center justify-center top-10">
        <ScrollView className="w-screen h-screen position-relative scroll ">
          <Card url="https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F7b57ff9681d844198ddca4cbe9b92554.png&w=1080&q=90" styles="h-40"/>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
      </View>
      <BottomNavBar />
    </View>
  );
}
