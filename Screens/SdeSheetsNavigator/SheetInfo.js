import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Text, useColorMode } from "native-base";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import QuestionInfoCard from "./components/QuestionInfoCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "../../components/Store/Store";

const { width, height } = Dimensions.get("window");

export default function SheetInfo({ navigation, route }) {
  let sheetName = route.params.sheetName;

  const [topics, setTopics] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoaded, setIsLoaded] = useState(true);
  const [userProgress, setUserProgress] = useState([]);
  const [checked, setChecked] = useState(false);
  const Difficulty = "Easy";
  const { user } = useStore((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    const getUserProgress = () => {
      setIsLoaded(true);
      const userId = user.uid;
      if (sheetName === "Love Babbar") {
        sheetName = "LoveBabbar";
      }
      const sheet = doc(db, "UserData", userId);
      getDoc(sheet).then((doc) => {
        setUserProgress(doc.data()[sheetName]);
        setIsLoaded(false);
      });
    };
    getUserProgress();
  }, []);

  useEffect(() => {
    const getSheetInfo = async () => {
      if (sheetName === "Love Babbar") {
        sheetName = "LoveBabbar";
      }
      const storedSheet = await AsyncStorage.getItem(sheetName);
      if (storedSheet) {
        setTopics(JSON.parse(storedSheet));
        setIsLoaded(false);
      } else {
        const colRef = collection(db, sheetName);
        getDocs(colRef).then(async (querySnapshot) => {
          let data = [];
          querySnapshot.forEach((doc) => {
            data = [
              ...data,
              {
                topic: doc.data().topic,
                link: doc.data().link,
                problem: doc.data().problem,
              },
            ];
          });
          setTopics(data);
          setIsLoaded(false);
          await AsyncStorage.setItem(sheetName, JSON.stringify(data));
        });
      }
    };
    getSheetInfo();
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, []);

  const updateInFB = async (index, isChecked) => {
    userProgress.splice(index, 1, isChecked);
    const ref = doc(db, "UserData", user.uid);
    if (sheetName === "Love Babbar") {
      sheetName = "LoveBabbar";
    }
    updateDoc(ref, {
      [sheetName]: userProgress,
    });
    setChecked(!checked);
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
      style={{
        flex: 1,
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: height * 0.03,
          marginLeft: width * 0.04,
          marginBottom: height * 0.02,
        }}
      >
        <Text style={styles.box3} fontSize={width * 0.02}>
          ⚙️ Problem Title
        </Text>
        <Text style={styles.box4} fontSize={width * 0.02}>
          🔗 Link
        </Text>
        <Text style={styles.box3} fontSize={width * 0.02}>
          📚 Topic
        </Text>
        <Text style={styles.box5} fontSize={width * 0.02}>
          ✅ Status
        </Text>
      </Box>
      <FlatList
        data={userProgress}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: height * 0.01, marginLeft: width * 0.04 }}
        renderItem={({ item, index }) => (
          <QuestionInfoCard
            index={index}
            sheetName={sheetName}
            isDone={item}
            item={topics[index]}
            updateInFB={updateInFB}
          />
        )}
      />
    </Box>
  );
}
const styles = StyleSheet.create({
  box: {
    color: "#fad8bd",
    fontFamily: "GbMed",
    paddingTop: 7.5,
    fontSize: 30,
    paddingLeft: width * 0.04,
  },
  box1: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: width * 0.9,
    height: height * 0.1,
    margin: height * 0.02,
    borderRadius: 10,
    textAlign: "center",
  },
  box3: {
    fontFamily: "GbBold",
    color: "#f4b078",
  },
  box4: {
    fontFamily: "GbBold",
    color: "#f4b078",
    marginLeft: width * 0.35,
  },
  box5: {
    fontFamily: "GbBold",
    color: "#f4b078",
    marginRight: width * 0.065,
  },
  box6: {
    fontFamily: "GbBold",
    backgroundColor: "#007b28",
    borderRadius: 15,
    padding: 10,
  },
  checkbox: {
    marginRight: width * 0.4,
  },
});
