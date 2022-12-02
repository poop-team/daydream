import { useState } from "react";
import { Text, Pressable, View, ScrollView, SafeAreaView } from "react-native";
import { imageStyles } from "../data/styles";
import Button from "../components/Button";
import Card from "../components/Card";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import SelectableChip from "../components/SelectableChip";

export default function ImageCreate({ navigation }) {
    const [search, setSearch] = useState("");

    return (
        <View className="flex-1">
        <SafeAreaView className="flex-1">
            <View className="android:mt-16 mb-4 ml-2 flex flex-row items-center">
                <Pressable>
                    <Icon
                        size={30}
                        name="arrow-back-outline"
                        onPress={() => navigation.navigate("FeedPage")}
                    />
                </Pressable>
                <View className="grow">
                    <TopNavBar icon="color-wand-outline" className="m-2" value={search} onChangeText={setSearch} />
                </View>
            </View>
            <ScrollView>
                <View className="flex flex-row flex-wrap justify-evenly">
                    {imageStyles.map(style =>
                        <SelectableChip
                            key={style}
                            className="m-2 max-w-fit"
                            label={style}
                            selected={false}
                            onSelect={() => { }}
                        />
                    )}
                </View>
                <View className="flex mt-4 items-center">
                    <Button name="Create" />
                </View>
                <View className="flex-row items-center">
                    <Text className="m-3 mr-2 text-2xl">Recently created</Text>
                    <Icon size={25} name="timer-outline"/>
                </View>
                <View className="">
                    <Card></Card>
                </View>
            </ScrollView>
        </SafeAreaView>
        <BottomNavBar navigation={navigation}/>
        </View>
    )
}
