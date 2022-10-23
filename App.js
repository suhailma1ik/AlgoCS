import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticationStack from "./Screens/Authentication/AuthenticationStack";
import HomeStackNavigator from "./Screens/HomeStackNavigator/HomeStackNavigator";
import { LogBox } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomeStack" component={HomeStackNavigator} />
          <Stack.Screen name="AuthStack" component={AuthenticationStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
