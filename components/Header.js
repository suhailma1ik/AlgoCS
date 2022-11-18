import React, { useEffect, useState } from "react";
import { HStack, IconButton, Icon, Text, Box, useToast } from "native-base";
import { Dimensions, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Shadow } from "react-native-shadow-2";
import { TouchableOpacity } from "react-native";
import useStore from "./Store/Store";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const url = "https://forms.gle/PYazYWAZcdfNdmoW9";
export function Header({ Topic }) {
  const navigation = useNavigation();
  const toast = useToast();
  const { user, userRole } = useStore((state) => ({
    user: state.user,
    userRole: state.userRole,
  }));
  const removeUserRole = useStore((state) => state.removeUserRole);
  const removeUser = useStore((state) => state.removeUser);

  const signOut = async () => {
    removeUser();
    removeUserRole();
    navigation.navigate("HomeStack");
  };
  const [fontsLoaded] = useFonts({
    GbMed: require("../assets/Fonts/Gilroy-Medium.ttf"),
    GbBold: require("../assets/Fonts/Gilroy-Bold.ttf"),
  });
  return (
    <Box>
      <StatusBar style="light" backgroundColor="#1c1f20" />
      <HStack py="3" px="1" alignItems="center" w="100%" maxW={width * 0.95}>
        <HStack alignItems="center">
          {Topic === "Home" ? null : (
            <IconButton
              onPress={() => navigation.goBack()}
              icon={<Icon size="lg" as={MaterialIcons} name="arrow-back" />}
            />
          )}
          <Text
            fontSize="20"
            fontWeight="bold"
            color="#c2c8d4"
            style={{
              fontFamily: "GbBold",
              fontWeight: "bold",
              marginLeft: width * 0.01,
            }}
          >
            {Topic}
          </Text>
        </HStack>
        {Topic === "Home" ? (
          <HStack
            alignItems="center"
            flex={1}
            justifyContent="flex-end"
            marginLeft={0}
          >
            <Box
              style={{
                marginRight: width * 0.03,
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  await Linking.openURL(url);
                }}
              >
                <Shadow
                  Shadow
                  startColor="#2c2c2c"
                  distance={10}
                  offset={[1, 1]}
                >
                  <Text
                    fontWeight="bold"
                    style={{
                      color: "#f9d3b4",
                      fontFamily: "GbBold",
                      fontWeight: "bold",
                      borderColor: "transparent",
                      borderWidth: 1,
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#1a1a1a",
                    }}
                    fontSize="xs"
                  >
                    Feedback
                  </Text>
                </Shadow>
              </TouchableOpacity>
            </Box>

            <Box bgColor="transparent">
              {userRole === null ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AuthStack");
                  }}
                >
                  <Shadow
                    Shadow
                    startColor="#2c2c2c"
                    distance={10}
                    offset={[1, 1]}
                  >
                    <Text
                      fontWeight="bold"
                      style={{
                        color: "#f9d3b4",
                        fontFamily: "GbBold",
                        fontWeight: "bold",
                        borderColor: "transparent",
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: "#1a1a1a",
                      }}
                      fontSize="xs"
                    >
                      Log In
                    </Text>
                  </Shadow>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    signOut();
                    toast.show({
                      description: "Signed out successfully",
                    });
                  }}
                >
                  <Shadow
                    Shadow
                    startColor="#2c2c2c"
                    distance={10}
                    offset={[1, 1]}
                  >
                    <Text
                      fontWeight="bold"
                      style={{
                        color: "#f9d3b4",
                        fontFamily: "GbBold",
                        fontWeight: "bold",
                        borderColor: "transparent",
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: "#1a1a1a",
                      }}
                      fontSize="xs"
                    >
                      Log Out
                    </Text>
                  </Shadow>
                </TouchableOpacity>
              )}
            </Box>
          </HStack>
        ) : null}
        {/* <ToggleDarkMode /> */}
      </HStack>
    </Box>
  );
}
