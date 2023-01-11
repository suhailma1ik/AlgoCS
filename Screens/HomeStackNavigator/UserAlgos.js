import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  CheckIcon,
  FlatList,
  Input,
  Select,
  useToast,
  Text,
  useColorMode,
} from "native-base";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { Shadow } from "react-native-shadow-2";
import { Header } from "../../components/Header";
import uuid from "react-uuid";
import Search from "../../components/Search";
import useStore from "../../components/Store/Store";
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
  const { colorMode, toggleColorMode } = useColorMode();
  const [algocount, setAlgoCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useStore((state) => ({
    user: state.user,
  }));
  const addnewAlgorithmName = async () => {
    const userId = user.uid;
    const id = uuid();
    const topicRef = doc(db, "UserData", userId, "personalAlgos", id);
    setDoc(topicRef, {
      AlgoName: newAlgorithmName,
      Algo: newAlgorithm,
      Language: language,
    });
    setNewAlgorithmName("");
    setNewAlgorithm("");
    setLanguage("");
    setAlgoCount(algocount + 1);
  };

  useEffect(async () => {
    const id = user.uid;
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
    });
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, [algocount]);

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

  if (isLoading) {
    return (
      <Box
        _dark={{ bg: "#1c1f20" }}
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
      alignItems='center'
      _dark={{ bg: "#1c1f20" }}
      _light={{ bg: "#dbd9d9" }}
      flex={1}
      style={{ overflow: Platform.OS === "android" ? "hidden" : "scroll" }}
    >
      <SafeAreaView>
        <Header navigation={navigation} Topic={"My Algos"} />
        {Platform.OS === "web" ? (
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Select
                customDropdownIconProps={{ color: "black", marginRight: 5 }}
                style={{ color: "black" }}
                _light={{
                  bg: "#969696",
                  borderRadius: 10,
                  fontFamily: "GbBold",
                  placeholderTextColor: "#515151",
                  margin: 1,
                }}
                _dark={{
                  bg: "#969696",
                  borderRadius: 10,
                  fontFamily: "GbBold",
                  placeholderTextColor: "#515151",
                  margin: 1,
                  marginBottom: 2,
                  width: width * 0.8,
                }}
                selectedValueColor='red'
                selectedValue={language}
                accessibilityLabel='Select Language'
                placeholder='Select Language'
                _selectedItem={{
                  bg: "red.900",
                  borderRadius: 10,
                  endIcon: <CheckIcon size='5' />,
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
                  marginBottom: 3.5,
                  width: width * 0.8,
                }}
                value={newAlgorithmName}
                onChangeText={(text) => setNewAlgorithmName(text)}
                placeholder='Add Name of Algorithm'
                placeholderTextColor='#4d4d4d'
              />
              <Input
                _dark={{
                  bg: "#969696",
                  color: "#fff",
                  borderRadius: 10,
                  fontFamily: "GbMed",
                  marginLeft: 3,
                  marginRight: 3,
                  marginBottom: 3.5,
                  width: width * 0.8,
                }}
                value={newAlgorithm}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setNewAlgorithm(text)}
                placeholder='Add Algorithm'
                placeholderTextColor='#4d4d4d'
              />
            </Box>
            <Shadow startColor='#2c2c2c' distance={15} offset={[-5, -5]}>
              <TouchableOpacity
                onPress={() => {
                  if (
                    newAlgorithmName !== "" &&
                    newAlgorithm !== "" &&
                    language !== ""
                  ) {
                    addnewAlgorithmName();
                    setModalVisible(false);
                  } else {
                    toast.show({
                      description: "Please fill all the fields",
                    });
                  }
                }}
              >
                <Text style={styles.text}>Add Algorithm</Text>
              </TouchableOpacity>
            </Shadow>
          </Box>
        ) : (
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
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
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Select
                  customDropdownIconProps={{ color: "black", marginRight: 5 }}
                  style={{ color: "black" }}
                  _light={{
                    bg: "#969696",
                    borderRadius: 10,
                    fontFamily: "GbBold",
                    placeholderTextColor: "#515151",
                    margin: 1,
                  }}
                  _dark={{
                    bg: "#969696",
                    borderRadius: 10,
                    fontFamily: "GbBold",
                    placeholderTextColor: "#515151",
                    margin: 1,
                    marginBottom: 2,
                    width: width * 0.8,
                  }}
                  selectedValueColor='red'
                  selectedValue={language}
                  accessibilityLabel='Select Language'
                  placeholder='Select Language'
                  _selectedItem={{
                    bg: "red.900",
                    borderRadius: 10,
                    endIcon: <CheckIcon size='5' />,
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
                    marginBottom: 3.5,
                    width: width * 0.8,
                  }}
                  value={newAlgorithmName}
                  onChangeText={(text) => setNewAlgorithmName(text)}
                  placeholder='Add Name of Algorithm'
                  placeholderTextColor='#4d4d4d'
                />
                <Input
                  _dark={{
                    bg: "#969696",
                    color: "#fff",
                    borderRadius: 10,
                    fontFamily: "GbMed",
                    marginLeft: 3,
                    marginRight: 3,
                    marginBottom: 3.5,
                    width: width * 0.8,
                  }}
                  value={newAlgorithm}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(text) => setNewAlgorithm(text)}
                  placeholder='Add Algorithm'
                  placeholderTextColor='#4d4d4d'
                />
              </Box>
              <Shadow startColor='#2c2c2c' distance={15} offset={[-5, -5]}>
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
                  <Text style={styles.text}>Add Algorithm</Text>
                </TouchableOpacity>
              </Shadow>
            </Box>
          </Modal>
        )}
        {Platform.OS !== "web" ? (
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
            <Shadow startColor='#2c2c2c' distance={15} offset={[-5, -5]}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={styles.text}>Add Algorithm</Text>
              </TouchableOpacity>
            </Shadow>
          </Box>
        ) : null}

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
                startColor='#292c2f'
                distance={12}
                offset={[12, 12]}
              >
                <Text style={styles.box} fontSize='4xl'>
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
    borderRadius: 10,
    textAlign: "center",
    color: "#f9d3b4",
    fontFamily: "GbBold",
    paddingTop: 7.5,
    color: "#fff",
    borderRadius: 10,
    backgroundColor: "#26458c",
  },
  text: {
    color: "#f9d3b4",
    fontFamily: "GbBold",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#b53333",
  },
  text1: {
    color: "#f9d3b4",
    fontFamily: "GbBold",
  },
});
