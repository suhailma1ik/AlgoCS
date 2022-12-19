import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Box, Text, useColorMode } from "native-base";
const SheetsName = [
  "Love Babbar",
  "Striver",
  "Apna College",
  "Faraz",
  "Blind 75",
  "GFG",
];

const { width, height } = Dimensions.get("window");

export default function HomeScreenSDE({ navigation }) {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, []);

  return (
    <Box
      _dark={{ bg: "#1c1f20" }}
      style={{
        flex: 1,
      }}
    >
      {SheetsName.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Sheet", { sheetName: item });
            }}
          >
            <Box
              style={{
                width: width * 0.9,
                height: height * 0.05,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{item}</Text>
            </Box>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
}

const styles = StyleSheet.create({});
