import 'react-native-gesture-handler';
import Authentication from "./src/pages/Authentication";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import FeedPage from './src/pages/feedPage';
import Dummypage from './src/components/pages/Dummypage';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Authentication}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FeedPage"
          component={FeedPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="createPage"
          options={{headerShown: false}}
        >
          {(props) => <Dummypage {...props} text= "create" />}
        </Stack.Screen>
        <Stack.Screen
          name="profilePage"
          options={{headerShown: false}}
        >
          {(props) => <Dummypage {...props} text= "profile" />}
        </Stack.Screen>    
      </Stack.Navigator>
    </NavigationContainer>
  );
}