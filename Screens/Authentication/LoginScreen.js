import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "native-base";
import { Header } from "../../components/Header";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../Firebase";
import { Shadow } from "react-native-shadow-2";
import { useFonts } from "expo-font";
import useStore from "../../components/Store/Store";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
export default function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    GbMed: require("../../assets/Fonts/Gilroy-Medium.ttf"),
    GbBold: require("../../assets/Fonts/Gilroy-Bold.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const setUserRoleZus = useStore((state) => state.setUserRole);
  const setUser = useStore((state) => state.setUser);

  const setUserRole = async (id, user) => {
    const userRef = doc(db, "CustomFields", id);
    setUser(user);
    const userRole = await getDoc(userRef);
    setUserRoleZus(userRole.data().role);
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
        toast.show({
          description: "Invalid email or password",
        });
      });
  };
  return (
    <Box
      _dark={{ bg: "#1c1f20" }}
      _light={{ bg: "#dbd9d9" }}
      flex={1}
      width={width}
      style={{ overflow: Platform.OS === "android" ? "hidden" : "scroll" }}
      alignItems="center"
    >
      <SafeAreaView>
        <Header Topic="Sign in" />
        <Center _dark={{ bg: "#1c1f20" }} _light={{ bg: "#1c1f20" }} flex={1}>
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              fontSize={30}
              color="#c2c8d4"
              style={{ fontFamily: "GbBold", textAlign: "center" }}
            >
              Welcome!
            </Heading>
            <Heading
              mt="1"
              color="#565f62"
              fontWeight="medium"
              size="xs"
              style={{
                fontFamily: "GbMed",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Sign in to Continue.
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
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  variant="unstyled"
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
                  }}
                  placeholder="Enter your Password"
                  placeholderTextColor="#4f596f"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  type="password"
                  variant="unstyled"
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
              <HStack mt="3" justifyContent="center">
                <Box style={{ marginTop: 20, justifyContent: "center" }}>
                  <Shadow startColor="#2c2c2c" distance={15} offset={[-5, -5]}>
                    <TouchableOpacity
                      onPress={Signin}
                      style={{ marginLeft: 0 }}
                    >
                      <Text
                        style={{
                          color: "#f9d3b4",
                          fontFamily: "GbBold",
                          borderRadius: 10,
                          padding: 10,
                          backgroundColor: "#b53333",
                        }}
                      >
                        Sign in
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
                  Don't have an Account? &nbsp;
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text color={"#8f470b"} style={{ fontFamily: "GbBold" }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({});
