import React from "react";
import { StyleSheet, Text } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHomeScreen from "./AdminHomeScreen";
const Stack = createNativeStackNavigator();

export default function AdminHomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={AdminHomeScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
