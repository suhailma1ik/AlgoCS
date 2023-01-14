import { Dimensions, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Text, useColorMode } from "native-base";
import { useFonts } from "expo-font";
import * as Progress from "react-native-progress";
import { Shadow } from "react-native-shadow-2";
import { Header } from "../../components/Header";
import useStore from "../../components/Store/Store";

const SheetsName1 = [
  {
    name: "Love Babbar",
    link: "https://media-exp1.licdn.com/dms/image/C4D22AQGSvU4K3lV-TA/feedshare-shrink_2048_1536/0/1663846492872?e=2147483647&v=beta&t=x9pRok5MXtbB3ovECypZh81MMqO5pwc_guuqfPYiGOg",
    problems: 446,
    solved: 100,
  },
  {
    name: "Striver",
    link: "https://yt3.ggpht.com/mO-SCDJLJ7R2lEgVQ8kPB9a5stxPm9xyMQUcEW7Ik7nbKeKfYSOQFI8iSMqKRD8gdGH8WtHKBA=s900-c-k-c0x00ffffff-no-rj",
    problems: 178,
    solved: 150,
  },
  {
    name: "Fraz",
    link: "https://yt3.googleusercontent.com/FitboDHvZPrXqXtbe1JjfeN9x_wgNxv58GDadFqIf5nu1peeADWpWdW82Sb7eBaFH-TNy9AqgbM=s900-c-k-c0x00ffffff-no-rj",
    problems: 319,
    solved: 200,
  },
  {
    name: "Blind75",
    link: "https://upload.wikimedia.org/wikipedia/commons/e/e4/B_symbol_white-red.png",
    problems: 75,
    solved: 50,
  },
  {
    name: "GFG",
    link: "data:image/png;base64,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",
    problems: 300,
    solved: 200,
  },
  {
    name: "AmanDhattarwal",
    link: "https://media.licdn.com/dms/image/C4E03AQFAoY-MSYJsCA/profile-displayphoto-shrink_800_800/0/1600154260690?e=2147483647&v=beta&t=l_BTSPSMWjK-RDRRX0-YsghTD3ij8PFmqxAy6ImL5XM",
    problems: 375,
    solved: 200,
  },
];
//write a function to map throught the name and link values for each key in then above object and access then in the below code

const { width, height } = Dimensions.get("window");

export default function HomeScreenSDE({ navigation }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [fontsLoaded] = useFonts({
    GbMed: require("../../assets/Fonts/Gilroy-Medium.ttf"),
    GbBold: require("../../assets/Fonts/Gilroy-Bold.ttf"),
  });
  const { user } = useStore((state) => ({
    user: state.user,
  }));
  // const [nextScreen, setNextScreen] = useState(false);
  useEffect(() => {
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, []);

  return (
    <Box _dark={{ bg: "#1c1f20" }} width={width} height={height} style={{}}>
      <Header Topic={"SDE Sheets"} />

      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {SheetsName1.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                user === null
                  ? navigation.navigate("Login")
                  : navigation.navigate("Sheet", { sheetName: item.name });
              }}
            >
              <Shadow
                Shadow
                startColor='#292c2f'
                distance={12}
                offset={[1, 31]}
              >
                <Box
                  style={{
                    width: width * 0.3,
                    height: height * 0.32,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#171717",
                    marginTop: height * 0.04,
                    borderRadius: 10,
                  }}
                >
                  <Box
                    style={{
                      width: width * 0.25,
                      height: height * 0.2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: width * 0.08,
                        height: height * 0.135,
                        borderRadius: 50,
                      }}
                      source={{
                        uri: item.link,
                      }}
                    />
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginRight: width * 0.02,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GbBold",
                          fontSize: width * 0.02,
                          marginBottom: width * 0.009,
                          color: "#e8e8e8",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GbMed",
                          fontSize: width * 0.0135,
                          color: "#c6c6c6",
                        }}
                      >
                        {" "}
                        <Text
                          style={{ fontFamily: "GbBold", color: "#e8e8e8" }}
                        >
                          {item.problems}
                        </Text>
                        {"  "}
                        Problems
                      </Text>
                    </Box>
                  </Box>
                  <Text
                    style={{
                      fontFamily: "GbMed",
                      marginBottom: height * 0.015,
                      color: "#c6c6c6",
                      fontSize: width * 0.0115,
                    }}
                  >
                    {" "}
                    <Text style={{ fontFamily: "GbBold", color: "#e8e8e8" }}>
                      {item.solved}
                    </Text>
                    {"  "}
                    Solved
                  </Text>
                  <Progress.Bar
                    progress={item.solved / item.problems}
                    width={width * 0.2}
                    color='grey'
                    animated={true}
                    borderColor='#303030'
                  />
                </Box>
              </Shadow>
            </TouchableOpacity>
          );
        })}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({});
