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
    toggleColorMode();
  };
  return (
    <HStack space={2} alignItems="center">
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
