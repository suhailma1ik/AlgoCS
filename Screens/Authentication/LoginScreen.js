import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
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
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../Firebase";
import { Shadow } from "react-native-shadow-2";
import { useFonts } from "expo-font";
import useStore from "../../components/Store/Store";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingActivity from "./Components/LoadingActivity";

const { width, height } = Dimensions.get("window");
export default function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    GbMed: require("../../assets/Fonts/Gilroy-Medium.ttf"),
    GbBold: require("../../assets/Fonts/Gilroy-Bold.ttf"),
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const toast = useToast();
  const setUserRoleZus = useStore((state) => state.setUserRole);
  const setUser = useStore((state) => state.setUser);

  const setUserRole = async (id, user) => {
    const userRef = doc(db, "UserData", id);
    setUser(user);
    const userRole = await getDoc(userRef);
    setUserRoleZus(userRole.data().role);
  };

  // safeArea p="2" py="8" w="90%" maxW="290"

  const Signin = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setUserRole(user.uid, user);
        setLoading(false);
        navigation.navigate("HomeStack");
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.show({
          description: "Invalid email or password",
        });
        setLoading(false);
      });
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
        <Header Topic='Sign in' />
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
                marginTop: width * 0.02,
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
                marginBottom: width * 0.03,
                fontSize: width * 0.015,
              }}
            >
              Sign in to Continue.
            </Heading>

            <VStack space={3} mt='5'>
              <FormControl>
                <Input
                  // width={Platform.OS === "android" ? width * 0.8 : {}}
                  width={width * 0.25}
                  style={{
                    backgroundColor: "#2d333f",
                    color: "#9ca6b9",
                    borderRadius: 10,
                    fontFamily: "GbBold",
                    borderColor: "transparent",
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 10,
                    fontSize: width * 0.01,
                  }}
                  placeholder='Enter your Email'
                  placeholderTextColor='#4f596f'
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  variant='unstyled'
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
                    marginBottom: width * 0.03,
                    padding: 10,
                    fontSize: width * 0.01,
                  }}
                  placeholder='Enter your Password'
                  placeholderTextColor='#4f596f'
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  type='password'
                  variant='unstyled'
                />
              </FormControl>
              <HStack mt='3' justifyContent='center'>
                <Box
                  style={{
                    marginTop: 20,
                    justifyContent: "center",
                    marginBottom: width * 0.01,
                  }}
                >
                  <Shadow startColor='#2c2c2c' distance={15} offset={[-5, -5]}>
                    <TouchableOpacity
                      onPress={Signin}
                      style={{ marginLeft: 0 }}
                    >
                      <Text
                        style={{
                          color: "#f9d3b4",
                          fontFamily: "GbBold",
                          borderRadius: 10,
                          padding: width * 0.008,
                          backgroundColor: "#b53333",
                          fontSize: width * 0.013,
                        }}
                      >
                        Sign in
                      </Text>
                    </TouchableOpacity>
                  </Shadow>
                </Box>
              </HStack>
              <HStack mt='3' justifyContent='center'>
                <Text
                  fontSize='sm'
                  color='#565f62'
                  style={{ fontFamily: "GbMed", fontSize: width * 0.012 }}
                >
                  Don't have an Account? &nbsp;
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text
                    color={"#8f470b"}
                    style={{ fontFamily: "GbBold", fontSize: width * 0.012 }}
                  >
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
