import { SafeAreaView, Image, View, Text, ScrollView } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthSession } from "../utils/storage";
import { getUser } from "../requests/fetch";
import { User } from "../types/user.type";

export default ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState("")
  const [userAvatar, setUserAvatar] = useState(null);

  const [user, setUser] = useState<User | null>(null);

  const [currentView, setCurrentView] = useState<"created" | "collections">(
    "created"
  );

  useEffect(() => {
    (async () => {
      const { userId, userAvatar, userName } = await getAuthSession();
      setUserId(userId);
      setUserName(userName);
      setUserAvatar(userAvatar);
    })();
  }, []);

  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useQuery({
    // FIXME figure out how to incorporate userid here
    queryKey: ["user_profile"],
    queryFn: async () => {
      const userId = (await getAuthSession()).userId;
      return getUser({ userId });
    },
    onSuccess: (user: User) => setUser(user),
    /*
    onError: (err: ErrorResponse) => {
      if (err.cause?.code === 404) {
        setNotFound(true);
      }
      toast.error(err.message);
    },
*/
  });
  return (
    <View className="w-full flex flex-1 justify-between">
      <SafeAreaView className="w-full flex flex-1">
        <ScrollView>
          <View className="flex items-center mt-16">
            <Image
              className="w-48 h-48 mt-4 rounded-full"
              source={require("../images/daydream_logo_words.png")}
            />
            <Text className="mb-2 text-lg font-semibold">@{userName}</Text>
            <View className="flex flex-row gap-2">
              <Text>{user?.postCount ?? 0} images</Text>
              <Text>{user?.collectionCount ?? 0} collections</Text>
            </View>
            <View className="flex flex-row gap-2 m-4 w-full justify-center">
              <Button
                className={`py-0 ${
                  currentView === "created" ? "bg-indigo-900" : "bg-transparent"
                }`}
                onPress={() => setCurrentView("created")}
              >
                <Text
                  className={`text-base ${
                    currentView === "created"
                      ? "text-slate-50"
                      : "text-indigo-900"
                  }`}
                >
                  Created
                </Text>
              </Button>
              <Button
                className={`py-0 ${
                  currentView === "collections"
                    ? "bg-indigo-900"
                    : "bg-transparent"
                }`}
                onPress={() => setCurrentView("collections")}
              >
                <Text
                  className={`text-base ${
                    currentView === "collections"
                      ? "text-slate-50"
                      : "text-indigo-900"
                  }`}
                >
                  Collections
                </Text>
              </Button>
            </View>
            <TopNavBar value={search} onChangeText={setSearch} />
            {currentView === "created" && <CreatedView />}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const CreatedView = () => {
  const urls = [
    "https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F9d532691aa47444996dba0e889b6a728.png&w=1080&q=90",
    "https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F9d532691aa47444996dba0e889b6a728.png&w=1080&q=90",
    "https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F9d532691aa47444996dba0e889b6a728.png&w=1080&q=90",
  ];

  return (
    <View className="w-full flex flex-row flex-wrap justify-evenly gap-y-1 my-1">
      {urls.map((uri: string) => (
        <Image source={{ uri }} className="rounded-lg h-[48vw] aspect-square" />
      ))}
      {urls.length % 2 === 1 && (
        <View className="rounded-lg h-[48vw] aspect-square" />
      )}
    </View>
  );
};
