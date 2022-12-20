import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "../HomeStackNavigator/HomeStackNavigator";
import SdeSheetsNavigator from "../SdeSheetsNavigator/SdeSheetsNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#040C17",
          borderTopColor: "#040C17",
        },
      }}
    >
      <Tab.Screen name='SDE Sheets' component={SdeSheetsNavigator} />
      <Tab.Screen name='Home' component={HomeStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
