import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticationStack from "./Screens/Authentication/AuthenticationStack";
import { LogBox } from "react-native";
import BottomTabNavigator from "./Screens/BottomTabNavigator/BottomTabNavigator";

const linking = {
  prefixes: [
    /* your linking prefixes */
  ],
  config: {
    screens: {
      HomeStack: {
        screens: {
          Home: "/",
          Topic: "topic",
          Algo: "algo",
          Languages: "languages",
          UserAlgos: "useralgos",
        },
      },
      AuthStack: {
        screens: {
          Login: "login",
          SignUp: "Signup",
        },
      },
    },
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
