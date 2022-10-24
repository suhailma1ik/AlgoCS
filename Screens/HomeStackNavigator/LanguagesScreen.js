import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import {
  Box,
  Button,
  Text,
  Input,
  FlatList,
  useColorMode,
  useToast,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import uuid from "react-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Shadow } from "react-native-shadow-2";

const { width, height } = Dimensions.get("window");

export default function LanguagesScreen({ navigation, route }) {
  const topic = route.params.topic;
  const id = route.params.id;
  const algoId = route.params.algoId;
  const algoName = route.params.algoName;
  const [Languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [newAlgorithm, setNewAlgorithm] = useState("");
  const [languagecnt, setLanguagecnt] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState("admin");
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const getStoredLanguages = async (key) => {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = JSON.parse(jsonValue);
    return value !== null ? value : null;
  };

  const getLanguageFromFirebase = async (key) => {
    const colRef = collection(db, "Topics", id, topic, algoId, algoName);
    getDocs(colRef).then(async (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data = [
          ...data,
          { Language: doc.data().Language, algo: doc.data().algo },
        ];
      });
      setLanguages(data);
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    });
  };

  useEffect(async () => {
    const key = topic + algoName;
    getLanguageFromFirebase(key);
    setIsLoaded(false);
  }, []);
  const addNewLanguage = () => {
    const langId = uuid();
    const Algoref = doc(db, "Topics", id, topic, algoId, algoName, langId);
    setDoc(Algoref, { Language: newLanguage, algo: newAlgorithm });
    setNewAlgorithm("");
    setNewLanguage("");
    setLanguagecnt(languagecnt + 1);
  };

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
      alignItems="center"
      _dark={{ bg: "#1c1f20" }}
      _light={{ bg: "#dbd9d9" }}
      flex={1}
      style={{ overflow: Platform.OS === "android" ? "hidden" : "scroll" }}
    >
      <SafeAreaView>
        <Header navigation={navigation} Topic={route.params.algoName} />
        {user === "admin" ? (
          <Box
            _dark={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#181818",
              paddingTop: 7,
              paddingBottom: 7,
              borderRadius: 20,
              borderColor: "#212121",
              marginLeft: 1,
              marginRight: 1,
            }}
            _light={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#50AF8E",
              paddingTop: 7,
              paddingBottom: 7,
              borderRadius: 20,
              borderColor: "#212121",
              marginLeft: 1,
              marginRight: 1,
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                width: width * 0.9,
                marginBottom: height * 0.02,
              }}
            >
              <Input
                _light={{
                  bg: "#3E886E",
                  borderRadius: 10,
                  placeholderTextColor: "#E8E8E8",
                  color: "#E8E8E8",
                  borderColor: "#3E886E",
                  fontFamily: "GbMed",
                  marginLeft: 3,
                  marginRight: 3,
                  margbiutBottom: 2,
                }}
                _dark={{
                  bg: "#969696",
                  color: "#fff",
                  borderRadius: 10,
                  fontFamily: "GbMed",
                  marginLeft: 3,
                  marginRight: 3,
                  margbiutBottom: 2,
                }}
                value={newLanguage}
                onChangeText={(text) => setNewLanguage(text)}
                placeholder="Add Name of Language"
                placeholderTextColor="#4d4d4d"
              />{" "}
              <Input
                _light={{
                  bg: "#3E886E",
                  borderRadius: 10,
                  placeholderTextColor: "#E8E8E8",
                  color: "#E8E8E8",
                  borderColor: "#3E886E",
                  marginLeft: 3,
                  marginRight: 3,
                  marginBottom: 2,
                }}
                _dark={{
                  bg: "#969696",
                  color: "#fff",
                  borderRadius: 10,
                  fontFamily: "GbMed",
                  marginLeft: 3,
                  marginRight: 3,
                  marginBottom: 2,
                }}
                value={newAlgorithm}
                onChangeText={(text) => setNewAlgorithm(text)}
                placeholder="Add Algorithm"
                placeholderTextColor="#4d4d4d"
              />
            </Box>
            {colorMode === "dark" ? (
              <Shadow startColor="#2c2c2c" distance={15} offset={[-5, -5]}>
                <TouchableOpacity
                  onPress={() => {
                    if (newLanguage !== "" && newAlgorithm !== "") {
                      addNewLanguage();
                    } else {
                      toast.show({
                        description: "Please fill all the fields",
                      });
                    }
                  }}
                >
                  <Text
                    _dark={{ bg: "#b53333" }}
                    _light={{ bg: "#a83232" }}
                    style={styles.text}
                  >
                    Add Algorithm
                  </Text>
                </TouchableOpacity>
              </Shadow>
            ) : (
              <Shadow startColor="#3e886e" distance={15} offset={[-5, -5]}>
                <TouchableOpacity
                  onPress={() => {
                    if (newLanguage !== "" && newAlgorithm !== "") {
                      addNewLanguage();
                    } else {
                      toast.show({
                        description: "Please fill all the fields",
                      });
                    }
                  }}
                >
                  <Text
                    _dark={{ bg: "#b53333" }}
                    _light={{ bg: "#a83232" }}
                    style={styles.text}
                  >
                    Add Algorithm
                  </Text>
                </TouchableOpacity>
              </Shadow>
            )}
          </Box>
        ) : null}

        <FlatList
          data={Languages}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Algo", {
                  algo: item.algo,
                  algoName: algoName,
                  language: item.Language,
                })
              }
              key={index}
              style={{ marginTop: height * 0.01 }}
            >
              {colorMode === "light" ? (
                <Shadow
                  Shadow
                  startColor="#bab8b8"
                  distance={12}
                  offset={[12, 12]}
                >
                  <Text
                    _light={{
                      bg: "#8E50AF",
                    }}
                    style={styles.box}
                    _dark={{
                      color: "#fff",
                      borderRadius: 10,
                      bg: "#26458c",
                    }}
                    __light={{ color: "#AF8E50" }}
                    fontSize="4xl"
                  >
                    {item.Language}
                  </Text>
                </Shadow>
              ) : (
                <Shadow
                  Shadow
                  startColor="#292c2f"
                  distance={12}
                  offset={[12, 12]}
                >
                  <Text
                    _light={{
                      bg: "#8E50AF",
                    }}
                    style={styles.box}
                    _dark={{
                      color: "#fff",
                      borderRadius: 10,
                      bg: "#26458c",
                    }}
                    __light={{ color: "#AF8E50" }}
                    fontSize="4xl"
                  >
                    {item.Language}
                  </Text>
                </Shadow>
              )}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: width * 0.9,
    height: height * 0.1,
    margin: height * 0.02,
    borderRadius: 10,
    textAlign: "center",
    color: "#f9d3b4",
    fontFamily: "GbBold",
    paddingTop: 7.5,
  },
  text: {
    color: "#f9d3b4",
    fontFamily: "GbBold",
    borderRadius: 10,
    padding: 10,
  },
  text1: {
    color: "#f9d3b4",
    fontFamily: "GbBold",
  },
});
