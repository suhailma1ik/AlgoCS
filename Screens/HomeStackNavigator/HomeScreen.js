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
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import uuid from "react-uuid";
import { db } from "../../Firebase";
import { Header } from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Shadow } from "react-native-shadow-2";
import Search from "../../components/Search";
const { width, height } = Dimensions.get("window");
const userRole = "admin";
export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    GbMed: require("../../assets/Fonts/Gilroy-Medium.ttf"),
    GbBold: require("../../assets/Fonts/Gilroy-Bold.ttf"),
  });

  const [topics, setTopics] = useState([]);
  const [searchedTopic, setSearchedTopic] = useState([]);
  const [count, setCount] = useState(0);
  const [newTopic, setNewTopic] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const drk = "#2c2c2c#3e886e";
  useEffect(async () => {
    await AsyncStorage.setItem("userRole", userRole);

    const colRef = collection(db, "Topics");
    getDocs(colRef).then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data = [...data, { id: doc.id, Name: doc.data().Name }];
      });
      setTopics(data);
      setSearchedTopic(data);
      setIsLoaded(false);
    });
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, [count]);

  const addNewTopic = () => {
    const id = uuid();
    const topicRef = doc(db, "Topics", id);
    setDoc(topicRef, { Name: newTopic });
    setCount(count + 1);
    setNewTopic("");
  };

  const searchTopic = (text) => {
    if (text !== "") {
      const searched = topics.filter((topic) => {
        return topic.Name.toLowerCase().includes(text.toLowerCase());
      });
      setSearchedTopic(searched);
    } else {
      setSearchedTopic(topics);
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
      _dark={{ bg: "#1c1f20" }}
      _light={{ bg: "#dbd9d9" }}
      flex={1}
      width={width}
      style={{ overflow: Platform.OS === "android" ? "hidden" : "scroll" }}
      alignItems="center"
    >
      <SafeAreaView>
        <Header Topic="Home" />

        {userRole === "admin" ? (
          <Box
            _dark={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#181818",
              paddingTop: 7,
              paddingBottom: 7,
              borderRadius: 20,
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
              marginLeft: 1,
              marginRight: 1,
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
                  marginLeft: 1,
                  marginRight: 1,
                  marginBottom: 2,
                }}
                _dark={{
                  bg: "#969696",
                  color: "#fff",
                  borderRadius: 10,
                  fontFamily: "GbMed",
                  marginLeft: 1,
                  marginRight: 1,
                  marginBottom: 2,
                }}
                value={newTopic}
                onChangeText={(text) => setNewTopic(text)}
                placeholder="Enter Name Of new Topic"
                placeholderTextColor="#4d4d4d"
              ></Input>
            </Box>
            <Shadow startColor="#2c2c2c" distance={15} offset={[-5, -5]}>
              <TouchableOpacity
                onPress={() => {
                  if (newTopic.length > 0) {
                    addNewTopic();
                  } else {
                    toast.show({
                      description: "Please Enter Topic Name",
                    });
                  }
                }}
              >
                <Text
                  _dark={{ bg: "#b53333" }}
                  _light={{ bg: "#a83232" }}
                  style={styles.text}
                >
                  Add Topic
                </Text>
              </TouchableOpacity>
            </Shadow>
          </Box>
        ) : null}
        <Search searchFunction={searchTopic} />
        <TouchableOpacity
          onPress={async () => {
            const user = await AsyncStorage.getItem("user");
            user === null
              ? navigation.navigate("AuthStack")
              : navigation.navigate("UserAlgos");
          }}
        >
          <Shadow Shadow startColor="#2c2c2c" distance={12} offset={[12, 12]}>
            <Text
              style={styles.box}
              _dark={{
                color: "#fff",
                borderRadius: 10,
                bg: "#26458c",
              }}
              __light={{ color: "#AF8E50" }}
              fontSize="4xl"
            >
              Add Your Algos
            </Text>
          </Shadow>
        </TouchableOpacity>
        <FlatList
          data={searchedTopic}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Topic", {
                  topic: item.Name,
                  id: item.id,
                });
              }}
              key={index}
              style={{ marginTop: height * 0.01 }}
            >
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
                  {item.Name}
                </Text>
              </Shadow>
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
