import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Text, Pressable, View, ScrollView, SafeAreaView } from "react-native";
import { imageStyles } from "../data/styles";
import Button from "../components/Button";
import Card from "../components/Card";
import Icon from "react-native-vector-icons/Ionicons";
import MultiSelect from "react-native-multiple-select";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
//import SelectableChip from "../components/SelectableChip";
import { searchPosts } from "../helpers/fetch";
import { getAuthSession } from "../utils/storage";

export default function ImageCreate({ navigation }) {
    const [prompt, setPrompt] = useState("");
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

    // const handleCreate = () => {
    //     let finalPrompt = prompt.trim();
    //     if (selectedStyles.length > 0) {
    //         finalPrompt += `, ${selectedStyles.join(", ")}`;
    //     }
    //     //create(finalPrompt);
    // };

    const { data: recentPostsData, isLoading: areRecentPostsLoading, refetch: refetchRecentPosts } = useQuery({
        queryKey: ["recent_posts"],
        queryFn: async () =>
            searchPosts({
                userId: (await getAuthSession()).userId,
                limit: 6,
                recentOnly: true,
            }),
        onError: (err: Error) => {
            // FIXME show a toast message
            console.error(err.message);
        },
    });

    return (
        <View className="flex-1">
            <SafeAreaView className="flex-1">
                <View className="android:mt-16 mb-4 ml-2 flex flex-row items-center">
                    <Pressable>
                        <Icon
                            size={35}
                            name="arrow-back-outline"
                            onPress={() => navigation.navigate("FeedPage")}
                        />
                    </Pressable>
                    <View className="grow">
                        <TopNavBar icon="color-wand-outline" className="m-2" value={prompt} onChangeText={setPrompt} />
                    </View>
                </View>
                <ScrollView>
                    <View className="flex m-3 justify-evenly">
                        <MultiSelect
                            items={imageStyles.map(x => ({ id: x, name: x }))}
                            uniqueKey="id"
                            selectText="Filters"
                            onSelectedItemsChange={setSelectedStyles} />
                        <Button name="Create" />
                    </View>
                    <View className="flex-row items-center">
                        <Text className="m-3 mr-2 font-bold first-line:text-2xl">Recently created</Text>
                        <Icon size={25} name="timer-outline" />
                    </View>
                    <View className="mb-4">
                        {areRecentPostsLoading ? <ActivityIndicator /> :
                            recentPostsData.posts.length === 0 ? <Text className="text-xl justify-content text-center">You haven't created anything yet :( Get creative!</Text> :
                            recentPostsData.posts.map(post => <Card key={post.id} url={post.imageURL} />)
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
            <BottomNavBar navigation={navigation} />
            <StatusBar style="auto" />
        </View>
    )
}