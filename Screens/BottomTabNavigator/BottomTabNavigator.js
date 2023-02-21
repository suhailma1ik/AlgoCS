import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeStackNavigator from "../HomeStackNavigator/HomeStackNavigator";
import SdeSheetsNavigator from "../SdeSheetsNavigator/SdeSheetsNavigator";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarStyle: {
          backgroundColor: "#040C17",
          borderTopColor: "#040C17",
        },
        tabBarLabelStyle: {
          color: "#fff",
        },
      }}
      // initialRouteName='Home'
    >
      <Tab.Screen name='SDE Sheets' component={SdeSheetsNavigator} />
      <Tab.Screen name='Home' component={HomeStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
