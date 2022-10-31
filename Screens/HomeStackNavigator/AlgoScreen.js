import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  Select,
  useColorMode,
  ScrollView,
  useToast,
  Text,
  CheckIcon,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import {
  dracula,
  monokai,
  github,
  tomorrow,
  hybrid,
  xcode,
  sunburst,
  solarizedDark,
  solarizedLight,
} from "react-syntax-highlighter/styles/hljs";
import * as Clipboard from "expo-clipboard";
import { useFonts } from "expo-font";
import useStore from "../../components/Store/Store";
const { width, height } = Dimensions.get("window");
const map1 = new Map();
map1.set("dracula", dracula);
map1.set("monokai", monokai);
map1.set("github", github);
map1.set("tomorrow", tomorrow);
map1.set("hybrid", hybrid);
map1.set("xcode", xcode);
map1.set("sunburst", sunburst);
map1.set("solarizedDark", solarizedDark);
map1.set("solarizedLight", solarizedLight);

const styleList = [
  "dracula",
  "monokai",
  "github",
  "tomorrow",
  "hybrid",
  "xcode",
  "sunburst",
  "solarizedDark",
  "solarizedLight",
];

export default function AlgoScreen({ navigation, route }) {
  const [algo, setAlgo] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const [language, setLanguage] = useState(route.params.language);
  const [theme, setTheme] = useState(dracula);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const setLocalTheme = useStore((state) => state.setLocalTheme);
  const { LocalTheme } = useStore((state) => ({
    LocalTheme: state.LocalTheme,
  }));
  const getStoredTheme = () => {
    const value = LocalTheme;
    return value !== null ? value : dracula;
  };
  const [fontsLoaded] = useFonts({
    GbMed: require("../../assets/Fonts/Gilroy-Medium.ttf"),
    GbBold: require("../../assets/Fonts/Gilroy-Bold.ttf"),
  });
  useEffect(async () => {
    const key = "theme";
    const value = getStoredTheme();
    setLocalTheme(value);
    setTheme(value);
    const algonr = route.params.algo;
    setAlgo(algonr);
    setIsLoaded(false);
  }, []);

  if (isLoaded) {
    return (
      <Box
        _dark={{ bg: "#1c1f20" }}
        _light={{ bg: "#dbd9d9" }}
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size="large" color="#008000" />
      </Box>
    );
  }

  return (
    <Box
      _dark={{ bg: "#1c1f20" }}
      _light={{ bg: "#dbd9d9" }}
      style={{
        overflow: Platform.OS === "android" ? "hidden" : "scroll",
      }}
      flex={1}
      alignItems="center"
    >
      <SafeAreaView>
        <Header
          fontFamily="GbBold"
          navigation={navigation}
          Topic={route.params.algoName}
        />
        <ScrollView>
          {/* code below this */}
          <Box mb={height * 0.02}>
            <Select
              width={width * 0.918}
              customDropdownIconProps={{ color: "black", marginRight: 5 }}
              style={styles.Icon}
              _light={{
                bg: "#3E886E",
                borderRadius: 10,
                placeholderTextColor: "#E8E8E8",
                borderColor: "#3E886E",
                margin: 1,
                fontFamily: "GbBold",
              }}
              _dark={{
                bg: "#969696",
                borderRadius: 10,
                fontFamily: "GbBold",
                placeholderTextColor: "#515151",
                margin: 1,
              }}
              placeholder="Choose Theme"
              mt={height * 0.01}
              _selectedItem={{
                bg: "red.900",
                borderRadius: 10,
                endIcon: <CheckIcon size="5" />,
              }}
              onValueChange={async (itemValue) => {
                setTheme(map1.get(itemValue));
                const key = "theme";
                setLocalTheme(map1.get(itemValue));
              }}
            >
              {styleList.map((item, index) => {
                return <Select.Item key={index} label={item} value={item} />;
              })}
            </Select>
          </Box>
          {Platform.OS !== "web" ? (
            <Text
              fontFamily="GbMed"
              marginLeft={1}
              color="#c2c8d4"
              marginBottom={4}
              textAlign="center"
            >
              Long press on the code to copy it .
            </Text>
          ) : null}
          {Platform.OS !== "web" ? (
            <TouchableOpacity
              onLongPress={() => {
                Clipboard.setString(algo);
                toast.show({
                  description: "Copied to Clipboard",
                });
              }}
              delayLongPress={100}
              activeOpacity={0.6}
            >
              <SyntaxHighlighter
                language={language}
                style={theme}
                heighlighter={"hljs"}
                selectable={true}
              >
                {algo}
              </SyntaxHighlighter>
            </TouchableOpacity>
          ) : (
            <SyntaxHighlighter
              language={language}
              style={theme}
              heighlighter={"hljs"}
              selectable={true}
            >
              {algo}
            </SyntaxHighlighter>
          )}
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  Icon: {
    color: "#000000",
  },
});
