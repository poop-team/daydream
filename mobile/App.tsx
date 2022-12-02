import "react-native-gesture-handler";
import Authentication from "./src/pages/Authentication";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import FeedPage from "./src/pages/FeedPage";
import ImageCreate from "./src/pages/ImageCreate";
import ForgotPassword from "./src/pages/ForgotPassword";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Stack = createStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Authentication}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FeedPage"
            component={FeedPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="createPage"
            component={ImageCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider >
  );
}
