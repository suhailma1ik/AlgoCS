import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  CheckIcon,
  FlatList,
  Input,
  ScrollView,
  Select,
  useToast,
} from "native-base";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { Shadow } from "react-native-shadow-2";
import { Header } from "../../components/Header";
import uuid from "react-uuid";
import Search from "../../components/Search";
const { width, height } = Dimensions.get("window");
const languages = ["c++", "java", "js", "python"];
export default function UserAlgos({ navigation }) {
  const [Algos, setAlgos] = useState([]);
  const [language, setLanguage] = useState("");
  const [searchedAlgos, setSearchedAlgos] = useState([]);
  const [newAlgorithmName, setNewAlgorithmName] = useState("");
  const [newAlgorithm, setNewAlgorithm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const addnewAlgorithmName = async () => {
    const idobj = await AsyncStorage.getItem("user");
    const userId = JSON.parse(idobj).uid;
    const id = uuid();
    const topicRef = doc(db, "PersonalAlgos", userId, "personalAlgos", id);
    setDoc(topicRef, {
      AlgoName: newAlgorithmName,
      Algo: newAlgorithm,
      Language: language,
    });
    setNewAlgorithmName("");
    setNewAlgorithm("");
    setLanguage("");
  };

  useEffect(async () => {
    const idobj = await AsyncStorage.getItem("user");
    const id = JSON.parse(idobj).uid;
    const colRef = collection(db, "PersonalAlgos", id, "personalAlgos");
    getDocs(colRef).then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data = [
          ...data,
          { Algo: doc.data().Algo, AlgoName: doc.data().AlgoName },
        ];
      });
      setAlgos(data);
      setSearchedAlgos(data);
      setIsLoading(false);
      console.log(data);
    });
  }, []);

  const searchAlgo = (text) => {
    if (text !== "") {
      const searched = Algos.filter((Algo) => {
        return Algo.AlgoName.toLowerCase().includes(text.toLowerCase());
      });
      setSearchedAlgos(searched);
    } else {
      setSearchedAlgos(Algos);
    }
  };

  // const [topics, setTopics] = useState([]);
  // const [searchedTopic, setSearchedTopic] = useState([]);
  // const searchTopic = (text) => {
  //   if (text !== "") {
  //     const searched = topics.filter((topic) => {
  //       return topic.Name.toLowerCase().includes(text.toLowerCase());
  //     });
  //     setSearchedTopic(searched);
  //   } else {
  //     setSearchedTopic(topics);
  //   }
  // };

  if (isLoading) {
    return (
      <Box
        _dark={{ bg: "#1c1f20" }}
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
        <Header navigation={navigation} Topic={"My Algos"} />

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
            {/* <Input
              _dark={{
                bg: "#969696",
                color: "#fff",
                borderRadius: 10,
                fontFamily: "GbMed",
                marginLeft: 3,
                marginRight: 3,
                margbiutBottom: 2,
              }}
              value={newAlgorithmName}
              onChangeText={(text) => setNewAlgorithmName(text)}
              placeholder="Add Name of Language"
              placeholderTextColor="#4d4d4d"
            />{" "} */}

            <Select
              selectedValue={language}
              accessibilityLabel="Select Language"
              placeholder="Choose Service"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setLanguage(itemValue)}
            >
              {languages.map((lang) => {
                return <Select.Item label={lang} value={lang} />;
              })}
            </Select>
            <Input
              _dark={{
                bg: "#969696",
                color: "#fff",
                borderRadius: 10,
                fontFamily: "GbMed",
                marginLeft: 3,
                marginRight: 3,
                margbiutBottom: 2,
              }}
              value={newAlgorithmName}
              onChangeText={(text) => setNewAlgorithmName(text)}
              placeholder="Add Name of Language"
              placeholderTextColor="#4d4d4d"
            />
            <Input
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

          <Shadow startColor="#2c2c2c" distance={15} offset={[-5, -5]}>
            <TouchableOpacity
              onPress={() => {
                if (
                  newAlgorithmName !== "" &&
                  newAlgorithm !== "" &&
                  language !== ""
                ) {
                  addnewAlgorithmName();
                } else {
                  toast.show({
                    description: "Please fill all the fields",
                  });
                }
              }}
            >
              <Text _dark={{ bg: "#b53333" }} style={styles.text}>
                Add Algorithm
              </Text>
            </TouchableOpacity>
          </Shadow>
        </Box>
        <Search searchFunction={searchAlgo} />
        <FlatList
          data={searchedAlgos}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Algo", {
                  algo: item.Algo,
                  algoName: item.AlgoName,
                  language: item.Language,
                })
              }
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
                  style={styles.box}
                  _dark={{
                    color: "#fff",
                    borderRadius: 10,
                    bg: "#26458c",
                  }}
                  fontSize="4xl"
                >
                  {item.AlgoName}
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
