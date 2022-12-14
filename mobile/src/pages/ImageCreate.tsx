import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Text, Pressable, View, ScrollView, SafeAreaView } from "react-native";
import { imageStyles } from "../data/styles";
import { createImageLoadingTexts as loadingTexts } from "../data/LoadingTexts";
import Button from "../components/Button";
import Card from "../components/Card";
import Icon from "react-native-vector-icons/Ionicons";
import MultiSelect from "../components/MultiSelect";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import { searchPosts } from "../requests/fetch";
import { getAuthSession } from "../utils/storage";
import { createPost } from "../requests/mutate";

export default function ImageCreate({ navigation }) {
    const [prompt, setPrompt] = useState("");
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [loadingText, setLoadingText] = useState(loadingTexts.start);

    const { mutate: create, isLoading: isCreating } = useMutation(createPost, {
        onSuccess: async () => {
            await refetchRecentPosts();
        },
        onError: (err: Error) => {
            // FIXME show a toast message
            console.error(err.message);
        },
    });

    const isCreateDisabled = prompt.trim() === "" || isCreating;

    const handleCreate = () => {
        let finalPrompt = prompt.trim();
        if (selectedStyles.length > 0) {
            finalPrompt += `, ${selectedStyles.join(", ")}`;
        }
        create(finalPrompt);
        setPrompt("");
        setSelectedStyles([]);
    };

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

    // Dynamically change the loading text.
    useEffect(() => {
        if (isCreating) {
            setLoadingText(loadingTexts.start);
            const timeout1 = setTimeout(() => {
                setLoadingText(loadingTexts.dream);
            }, 2500);
            const timeout2 = setTimeout(() => {
                setLoadingText(loadingTexts.final);
            }, 7000);

            return () => {
                clearTimeout(timeout1);
                clearTimeout(timeout2);
            };
        }
    }, [isCreating]);

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1">
                <View className="android:mt-16 mb-4 ml-2 flex flex-row items-center">
                    <Pressable>
                        <Icon
                            size={35}
                            name="arrow-back-outline"
                            onPress={() => navigation.navigate("FeedPage")}
                        />
                    </Pressable>
                    <View className="grow mt-2">
                        <TopNavBar icon="color-wand-outline" className="m-2" value={prompt} onChangeText={setPrompt} />
                    </View>
                </View>
                <View className="flex ml-10 overflow-x-scroll mr-10 mt-0">
                    <MultiSelect
                        items={imageStyles.map(x => ({ id: x, name: x }))}
                        uniqueKey="id"
                        onSelectedItemsChange={setSelectedStyles}
                        selectedItems={selectedStyles}
                        selectedItemTextColor="#312e81"
                        selectedItemIconColor="#312e81"
                        tagBorderColor="#312e81"
                        submitButtonColor="#312e81"
                        tagTextColor="#312e81"
                        tagRemoveIconColor="#ed4242"
                        tagContainerStyle={{ backgroundColor: "white" }}
                    />
                </View>
                <View className="flex m-6">
                    <Button
                        className={"w-fit"}
                        loading={isCreating}
                        disabled={isCreateDisabled}
                        onPress={handleCreate}
                        name={isCreating ? loadingText : "Create"} 
                    />
                </View>
                <View className="flex-row mb-4 items-center justify-center">
                    <Text className=" mr-2 font-bold first-line:text-2xl">Recently created</Text>
                    <Icon size={25} name="timer-outline" />
                </View>
                <ScrollView>
                    <View className="mb-4">
                        {areRecentPostsLoading ? <ActivityIndicator /> :
                            recentPostsData.posts.length === 0 ? <Text className="text-xl justify-content text-center">You haven't created anything yet :( Get creative!</Text> :
                                recentPostsData.posts.map(post => <Card key={post.id} post={post} />)
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
            <BottomNavBar navigation={navigation} />
            <StatusBar style="auto" />
        </View>
    )
}
