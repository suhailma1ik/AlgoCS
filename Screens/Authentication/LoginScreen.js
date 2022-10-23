import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  Link,
  VStack,
} from "native-base";
import { Header } from "../../components/Header";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUserRole = async (id, user) => {
    const userRef = doc(db, "CustomFields", id);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    const userRole = await getDoc(userRef);
    await AsyncStorage.setItem("userRole", userRole.data().role);
  };

  const Signin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setUserRole(user.uid, user);
        navigation.navigate("HomeStack");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <Box _dark={{ bg: "blueGray.900" }} _light={{ bg: "#f2f4f7" }} flex={1}>
      <Header Topic="Login" />
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "#f2f4f7" }}
        flex={1}
      >
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input value={email} onChangeText={(text) => setEmail(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                value={password}
                onChangeText={(text) => setPassword(text)}
                type="password"
              />
              {/* <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link> */}
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={Signin}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text color={"indigo.500"}>Sign Up</Text>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({});
