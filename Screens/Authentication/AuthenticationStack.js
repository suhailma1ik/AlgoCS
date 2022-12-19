import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function AuthenticationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}></Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
