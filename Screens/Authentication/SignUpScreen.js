import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "native-base";
import { Header } from "../../components/Header";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { Shadow } from "react-native-shadow-2";
import { useFonts } from "expo-font";
import useStore from "../../components/Store/Store";
export default function SignUpScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    GbMed: require("../../assets/Fonts/Gilroy-Medium.ttf"),
    GbBold: require("../../assets/Fonts/Gilroy-Bold.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const setUserRoleZus = useStore((state) => state.setUserRole);
  const setUser = useStore((state) => state.setUser);

  const setUserAndRole = async (id, user) => {
    const userRef = doc(db, "CustomFields", id);
    await setDoc(userRef, { role: "user" });
    setUser(user);
    setUserRoleZus("user");
  };
  const SignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setUserAndRole(user.uid, user);
        navigation.navigate("UserAlgos");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box _dark={{ bg: "#1c1f20" }} _light={{ bg: "#1c1f20" }} flex={1}>
      <Header Topic="Sign Up" />
      <Center _dark={{ bg: "#1c1f20" }} _light={{ bg: "#1c1f20" }} flex={1}>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            fontSize={30}
            color="#c2c8d4"
            style={{ fontFamily: "GbBold", textAlign: "center" }}
            fontWeight="600"
          >
            Welcome!
          </Heading>
          <Heading
            mt="1"
            color="#565f62"
            style={{
              fontFamily: "GbMed",
              textAlign: "center",
              marginBottom: 20,
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to Continue.
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <Input
                style={{
                  backgroundColor: "#2d333f",
                  color: "#9ca6b9",
                  borderRadius: 10,
                  fontFamily: "GbBold",
                  borderColor: "transparent",
                  borderWidth: 1,
                  marginBottom: 5,
                }}
                placeholder="Enter your Email"
                placeholderTextColor="#4f596f"
                variant="unstyled"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </FormControl>
            <FormControl>
              <Input
                style={{
                  backgroundColor: "#2d333f",
                  color: "#9ca6b9",
                  borderRadius: 10,
                  fontFamily: "GbBold",
                  borderColor: "transparent",
                  borderWidth: 1,
                  marginBottom: 5,
                }}
                placeholder="Enter your Password"
                placeholderTextColor="#4f596f"
                variant="unstyled"
                value={password}
                onChangeText={(text) => setPassword(text)}
                type="password"
              />
            </FormControl>
            <FormControl>
              <Input
                style={{
                  backgroundColor: "#2d333f",
                  color: "#9ca6b9",
                  borderRadius: 10,
                  fontFamily: "GbBold",
                  borderColor: "transparent",
                  borderWidth: 1,
                  marginBottom: 5,
                }}
                placeholder="Confirm your Password"
                placeholderTextColor="#4f596f"
                variant="unstyled"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                type="password"
              />
            </FormControl>
            {/* <Button mt="2" colorScheme="indigo" onPress={SignUp}>
              Sign up
            </Button> */}
            <HStack mt="3" justifyContent="center">
              <Box style={{ marginTop: 20, justifyContent: "center" }}>
                <Shadow startColor="#2c2c2c" distance={15} offset={[-5, -5]}>
                  <TouchableOpacity onPress={SignUp} style={{ marginLeft: 0 }}>
                    <Text
                      style={{
                        color: "#f9d3b4",
                        fontFamily: "GbBold",
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: "#b53333",
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </Shadow>
              </Box>
            </HStack>
            <HStack mt="3" justifyContent="center">
              <Text
                fontSize="sm"
                color="#565f62"
                style={{ fontFamily: "GbMed" }}
              >
                Have an Account? &nbsp;
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text color={"#8f470b"} style={{ fontFamily: "GbBold" }}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({});
