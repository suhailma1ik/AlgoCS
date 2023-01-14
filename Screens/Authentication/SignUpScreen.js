import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { Shadow } from "react-native-shadow-2";
import { useFonts } from "expo-font";
import useStore from "../../components/Store/Store";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingActivity from "./Components/LoadingActivity";
import { arrayMaker, validateSignUp } from "../../utils/validator";

const { width, height } = Dimensions.get("window");
export default function SignUpScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    GbMed: require("../../assets/Fonts/Gilroy-Medium.ttf"),
    GbBold: require("../../assets/Fonts/Gilroy-Bold.ttf"),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const setUserRoleZus = useStore((state) => state.setUserRole);
  const setUser = useStore((state) => state.setUser);

  const setUserAndRole = async (uid, user) => {
    const userRef = doc(db, "UserData", uid);
    setUser(user);
    setUserRoleZus("user");
    await setDoc(userRef, {
      role: "user",
      uid: uid,
      name: name,
      email: email,
      LoveBabbar: arrayMaker(446),
      Striver: arrayMaker(178),
      Fraz: arrayMaker(319),
      AmanDhattarwal: arrayMaker(375),
      GFG: arrayMaker(185),
      Blind75: arrayMaker(169),
    });
  };
  const SignUp = () => {
    let valid = validateSignUp(name, email, password, confirmPassword);
    if (valid) {
      setLoading(true);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          navigation.navigate("HomeStack");
          navigation.navigate("Home");
          await setUserAndRole(user.uid, user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  if (loading) {
    return (
      <Box
        _dark={{ bg: "#1c1f20" }}
        _light={{ bg: "#dbd9d9" }}
        flex={1}
        justifyContent='center'
        alignItems='center'
      >
        <ActivityIndicator size='large' color='#008000' />
      </Box>
    );
  }
  return (
    <Box
      _dark={{ bg: "#1c1f20" }}
      _light={{ bg: "#dbd9d9" }}
      flex={1}
      width={width}
      style={{ overflow: Platform.OS === "android" ? "hidden" : "hidden" }}
      alignItems='center'
    >
      <SafeAreaView>
        {/* {loading && <LoadingActivity />} */}

        <Header Topic='Sign Up' />
        <Center _dark={{ bg: "#1c1f20" }} _light={{ bg: "#1c1f20" }} flex={1}>
          <Box
            width={Platform.OS === "android" ? width * 0.99 : width * 0.918}
            alignItems='center'
          >
            <Heading
              width={width * 0.25}
              height={height * 0.05}
              fontWeight='600'
              fontSize={30}
              color='#c2c8d4'
              style={{
                fontFamily: "GbBold",
                textAlign: "center",
                fontSize: width * 0.05,
                marginBottom: width * 0.04,
              }}
            >
              Welcome!
            </Heading>
            <Heading
              mt='1'
              color='#565f62'
              fontWeight='medium'
              width={width * 0.2}
              height={height * 0.05}
              style={{
                fontFamily: "GbMed",
                textAlign: "center",
                marginBottom: width * 0.02,
                fontSize: width * 0.015,
              }}
            >
              Sign up to Continue.
            </Heading>
            <VStack space={3} mt='5'>
              <FormControl>
                <Input
                  width={width * 0.25}
                  style={{
                    backgroundColor: "#2d333f",
                    color: "#9ca6b9",
                    borderRadius: 10,
                    fontFamily: "GbBold",
                    borderColor: "transparent",
                    borderWidth: 1,
                    marginBottom: width * 0.01,
                    padding: 10,
                    fontSize: width * 0.01,
                  }}
                  placeholder='Enter your Name'
                  placeholderTextColor='#4f596f'
                  variant='unstyled'
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </FormControl>
              <FormControl>
                <Input
                  width={width * 0.25}
                  style={{
                    backgroundColor: "#2d333f",
                    color: "#9ca6b9",
                    borderRadius: 10,
                    fontFamily: "GbBold",
                    borderColor: "transparent",
                    borderWidth: 1,
                    marginBottom: width * 0.01,
                    padding: 10,
                    fontSize: width * 0.01,
                  }}
                  placeholder='Enter your Email'
                  placeholderTextColor='#4f596f'
                  variant='unstyled'
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </FormControl>
              <FormControl>
                <Input
                  width={width * 0.25}
                  style={{
                    backgroundColor: "#2d333f",
                    color: "#9ca6b9",
                    borderRadius: 10,
                    fontFamily: "GbBold",
                    borderColor: "transparent",
                    borderWidth: 1,
                    marginBottom: width * 0.01,
                    padding: 10,
                    fontSize: width * 0.01,
                  }}
                  placeholder='Enter your Password'
                  placeholderTextColor='#4f596f'
                  variant='unstyled'
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  type='password'
                />
              </FormControl>
              <FormControl>
                <Input
                  width={width * 0.25}
                  style={{
                    backgroundColor: "#2d333f",
                    color: "#9ca6b9",
                    borderRadius: 10,
                    fontFamily: "GbBold",
                    borderColor: "transparent",
                    borderWidth: 1,
                    marginBottom: width * 0.01,
                    padding: 10,
                    fontSize: width * 0.01,
                  }}
                  placeholder='Confirm your Password'
                  placeholderTextColor='#4f596f'
                  variant='unstyled'
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  type='password'
                />
              </FormControl>
              {/* <Button mt="2" colorScheme="indigo" onPress={SignUp}>
              Sign up
            </Button> */}
              <HStack mt='3' justifyContent='center'>
                <Box style={{ marginTop: 20, justifyContent: "center" }}>
                  <Shadow startColor='#2c2c2c' distance={15} offset={[-5, -5]}>
                    <TouchableOpacity
                      onPress={SignUp}
                      style={{ marginLeft: 0 }}
                    >
                      <Text
                        style={{
                          color: "#f9d3b4",
                          fontFamily: "GbBold",
                          borderRadius: 10,
                          padding: width * 0.006,
                          backgroundColor: "#b53333",
                          fontSize: width * 0.011,
                        }}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </Shadow>
                </Box>
              </HStack>
              <HStack mt='3' justifyContent='center'>
                <Text
                  fontSize='sm'
                  color='#565f62'
                  style={{ fontFamily: "GbMed", fontSize: width * 0.011 }}
                >
                  Have an Account? &nbsp;
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text
                    color={"#8f470b"}
                    style={{ fontFamily: "GbBold", fontSize: width * 0.011 }}
                  >
                    Sign in
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
