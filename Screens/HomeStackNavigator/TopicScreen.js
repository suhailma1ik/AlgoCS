import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  useToast,
  FlatList,
  Input,
  Text,
  useColorMode,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import { db } from "../../Firebase";
import uuid from "react-uuid";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Shadow } from "react-native-shadow-2";
import Search from "../../components/Search";
const { width, height } = Dimensions.get("window");

export default function TopicScreen({ navigation, route }) {
  const topic = route.params.topic;
  const id = route.params.id;
  const [algos, setAlgos] = useState([]);
  const [searchedAlgos, setSearchedAlgos] = useState([]);
  const [newAlgorithmName, setNewAlgorithmName] = useState("");
  const [algocnt, setAlgoCnt] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState("admin");
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  useEffect(async () => {
    const value = await AsyncStorage.getItem("user");
    if (value !== null) {
      console.log(user);
      setUser(value);
    }

    const colRef = collection(db, "Topics", id, topic);
    getDocs(colRef).then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data = [
          ...data,
          { AlgoName: doc.data().AlgoName, Algo: doc.data().Algo, id: doc.id },
        ];
      });
      setAlgos(data);
      setSearchedAlgos(data);
      setIsLoaded(false);
    });
  }, [algocnt]);

  const addNewAlgo = () => {
    const algoId = uuid();
    const Algoref = doc(db, "Topics", id, topic, algoId);
    setDoc(Algoref, { AlgoName: newAlgorithmName });
    setAlgoCnt(algocnt + 1);
    setNewAlgorithmName("");
  };

  const searchAlgos = (text) => {
    if (text !== "") {
      const searched = algos.filter((algo) => {
        return algo.AlgoName.toLowerCase().includes(text.toLowerCase());
      });
      setSearchedAlgos(searched);
    } else {
      setSearchedAlgos(algos);
    }
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
        <Header navigation={navigation} Topic={route.params.topic} />

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
                }}
                _dark={{
                  bg: "#969696",
                  color: "#fff",
                  borderRadius: 10,
                  fontFamily: "GbMed",
                  marginLeft: 3,
                  marginRight: 3,
                }}
                value={newAlgorithmName}
                onChangeText={(text) => setNewAlgorithmName(text)}
                placeholder="Add Name of Question"
                placeholderTextColor="#4d4d4d"
              />{" "}
            </Box>
            {colorMode === "dark" ? (
              <Shadow startColor="#2c2c2c" distance={15} offset={[-5, -5]}>
                <Text
                  _dark={{ bg: "#b53333" }}
                  _light={{ bg: "#a83232" }}
                  onPress={() => {
                    if (newAlgorithmName !== "") {
                      addNewAlgo();
                    } else {
                      toast.show({
                        description: "Please Enter Name of Question",
                      });
                    }
                  }}
                  style={styles.text}
                >
                  Add Question
                </Text>
              </Shadow>
            ) : (
              <Shadow startColor="#3e886e" distance={15} offset={[-5, -5]}>
                <Text
                  _dark={{ bg: "#b53333" }}
                  _light={{ bg: "#a83232" }}
                  onPress={() => {
                    if (newAlgorithmName !== "") {
                      addNewAlgo();
                    } else {
                      toast.show({
                        description: "Please Enter Name of Question",
                      });
                    }
                  }}
                  style={styles.text}
                >
                  Add Question
                </Text>
              </Shadow>
            )}
          </Box>
        ) : null}
        <Search searchFunction={searchAlgos} />
        <FlatList
          data={searchedAlgos}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Languages", {
                  algoName: item.AlgoName,
                  topic: topic,
                  id: id,
                  algoId: item.id,
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
                    {item.AlgoName}
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
                    {item.AlgoName}
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
