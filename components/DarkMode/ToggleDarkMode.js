import AsyncStorage from "@react-native-async-storage/async-storage";
import { extendTheme, HStack, Switch, Text, useColorMode } from "native-base";
import { StatusBar } from "react-native";
// Define the config
const config = {
  useSystemColorMode: true,
  initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({ config });
export function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const chnageColor = async () => {
    console.log(colorMode);
    toggleColorMode();
    await AsyncStorage.setItem("mode", colorMode);
  };
  return (
    <HStack space={2} alignItems="center">
      <StatusBar
        barStyle={colorMode !== "dark" ? "dark-content" : "light-content"}
        backgroundColor={colorMode !== "dark" ? "#dbd9d9" : "#1c1f20"}
      />
      <Text style={{ fontFamily: "GbMed" }}>Light</Text>
      <Switch
        offTrackColor="grey.200"
        onTrackColor="blue.500"
        isChecked={colorMode !== "light"}
        onToggle={chnageColor}
        aria-label={
          colorMode === "dark" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text style={{ fontFamily: "GbMed" }}>Dark</Text>
    </HStack>
  );
}
