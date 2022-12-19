import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "./HomeScreen";
import TopicScreen from "./TopicScreen";
import AlgoScreen from "./AlgoScreen";
import LanguagesScreen from "./LanguagesScreen";
import UserAlgos from "./UserAlgos";
import LoginScreen from "../Authentication/LoginScreen";
import SignUpScreen from "../Authentication/SignUpScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Topic" component={TopicScreen} />
      <Stack.Screen name="Algo" component={AlgoScreen} />
      <Stack.Screen name="Languages" component={LanguagesScreen} />
      <Stack.Screen name="UserAlgos" component={UserAlgos} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
