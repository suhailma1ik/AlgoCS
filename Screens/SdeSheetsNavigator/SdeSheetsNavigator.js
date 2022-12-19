import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreenSDE from "./HomeScreenSDE";
import SheetInfo from "./SheetInfo";

const Stack = createNativeStackNavigator();
export default function SdeSheetsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreenSDE} />
      <Stack.Screen name="Sheet" component={SheetInfo} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
