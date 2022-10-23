import React from "react";
import {
  HStack,
  IconButton,
  Icon,
  Text,
  StatusBar,
  Box,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function Header({ Topic }) {
  const navigation = useNavigation();
  const toast = useToast();
  const [fontsLoaded] = useFonts({
    GbMed: require("../assets/Fonts/Gilroy-Medium.ttf"),
    GbBold: require("../assets/Fonts/Gilroy-Bold.ttf"),
  });
  const signOut = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("userRole");
  };
  return (
    <Box>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <HStack py="3" px="1" alignItems="center" w="100%" maxW="350">
        <HStack alignItems="center">
          {Topic === "Home" ? null : (
            <IconButton
              onPress={() => navigation.goBack()}
              icon={<Icon size="lg" as={MaterialIcons} name="arrow-back" />}
            />
          )}
          <Text fontSize="20" fontWeight="bold" fontFamily="GbBold">
            {Topic}
          </Text>
        </HStack>
        {Topic === "Home" ? (
          <Box bgColor="#4649FF">
            <TouchableOpacity
              onPress={() => {
                signOut();

                toast.show({
                  description: "Signed out successfully",
                });
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </Box>
        ) : null}
        {/* <ToggleDarkMode /> */}
      </HStack>
    </Box>
  );
}
