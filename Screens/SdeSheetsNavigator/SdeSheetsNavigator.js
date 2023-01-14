import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreenSDE from "./HomeScreenSDE";
import SheetInfo from "./SheetInfo";
import LoginScreen from "../Authentication/LoginScreen";
import SignUpScreen from "../Authentication/SignUpScreen";

const Stack = createNativeStackNavigator();
export default function SdeSheetsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeStack' component={HomeScreenSDE} />
      <Stack.Screen name='Sheet' component={SheetInfo} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
