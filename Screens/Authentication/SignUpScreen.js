import { StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
} from "native-base";
import { Header } from "../../components/Header";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setUserAndRole = async (id, user) => {
    const userRef = doc(db, "CustomFields", id);
    await setDoc(userRef, { role: "user" });
    // const userRefPersonalAgos = doc(db, "PersonalAlgos", id);
    // await setDoc(userRefPersonalAgos, { role: "user" });
    const struser = JSON.stringify(user);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("userRole", "user");
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
    <Box _dark={{ bg: "blueGray.900" }} _light={{ bg: "#f2f4f7" }} flex={1}>
      <Header Topic="Signup" />
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        flex={1}
      >
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input value={email} onChangeText={(text) => setEmail(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                value={password}
                onChangeText={(text) => setPassword(text)}
                type="password"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                type="password"
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={SignUp}>
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({});
