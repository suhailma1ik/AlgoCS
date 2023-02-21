import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Box,
  Icon,
  IconButton,
  Text,
  useColorMode,
  useToast,
} from "native-base";
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
  // const Difficulty = "Easy";
  const toast = useToast();

  const { user, Babbar, Striver, Blind75, Fraz, AmanDhattarwal, GFG } =
    useStore((state) => ({
      user: state.user,
      Babbar: state.Babbar,
      Striver: state.Striver,
      Blind75: state.Blind75,
      Fraz: state.Fraz,
      AmanDhattarwal: state.AmanDhattarwal,
      GFG: state.GFG,
    }));
  const setBabbar = useStore((state) => state.setBabbar);
  const setStriver = useStore((state) => state.setStriver);
  const setBlind75 = useStore((state) => state.setBlind75);
  const setFraz = useStore((state) => state.setFraz);
  const setAmanDhattarwal = useStore((state) => state.setAmanDhattarwal);
  const setGFG = useStore((state) => state.setGFG);
  const getUserProgress = () => {
    setIsLoaded(true);
    const userId = user.uid;
    if (sheetName === "Love Babbar") {
      sheetName = "LoveBabbar";
    }
    const sheet = doc(db, "UserData", userId);

    getDoc(sheet).then((doc) => {
      setUserProgress(doc.data()[sheetName]);
      // console.log(doc.data()[sheetName]);
      const count = doc.data()[sheetName].filter((val) => val === true).length;
      // console.log(count);
      if (sheetName === "LoveBabbar") setBabbar(count);
      else if (sheetName === "Striver") setStriver(count);
      else if (sheetName === "Blind75") setBlind75(count);
      else if (sheetName === "Fraz") setFraz(count);
      else if (sheetName === "AmanDhattarwal") setAmanDhattarwal(count);
      else if (sheetName === "GFG") setGFG(count);

      setIsLoaded(false);
    });
  };

  useEffect(() => {
    const getSheetInfo = async () => {
      if (sheetName === "Love Babbar") {
        sheetName = "LoveBabbar";
      }
      const storedSheet = await AsyncStorage.getItem(sheetName);
      if (storedSheet) {
        // console.log(storedSheet);
        setTopics(JSON.parse(storedSheet));
        setIsLoaded(false);
      } else {
        const colRef = collection(db, sheetName);
        await getDocs(colRef).then(async (querySnapshot) => {
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
          data.sort((a, b) => (a.topic > b.topic ? 1 : -1));
          setTopics(data);
          await AsyncStorage.setItem(sheetName, JSON.stringify(data));
          window.location.reload();
          toast.show({
            title: "Loading Sheet",
          });
          setIsLoaded(false);
        });
      }
    };
    getSheetInfo();
    getUserProgress();
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, []);

  const updateInFB = async (index, isChecked) => {
    userProgress.splice(index, 1, isChecked);

    if (isChecked) {
      if (sheetName === "LoveBabbar") setBabbar(Babbar + 1);
      else if (sheetName === "Striver") setStriver(Striver + 1);
      else if (sheetName === "Blind75") setBlind75(Blind75 + 1);
      else if (sheetName === "Fraz") setFraz(Fraz + 1);
      else if (sheetName === "AmanDhattarwal")
        setAmanDhattarwal(AmanDhattarwal + 1);
      else if (sheetName === "GFG") setGFG(GFG + 1);
    } else {
      if (sheetName === "LoveBabbar") setBabbar(Babbar - 1);
      else if (sheetName === "Striver") setStriver(Striver - 1);
      else if (sheetName === "Blind75") setBlind75(Blind75 - 1);
      else if (sheetName === "Fraz") setFraz(Fraz - 1);
      else if (sheetName === "AmanDhattarwal")
        setAmanDhattarwal(AmanDhattarwal - 1);
      else if (sheetName === "GFG") setGFG(GFG - 1);
    }

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
          <IconButton
            onPress={() => navigation.goBack()}
            icon={<Icon size='sm' as={MaterialIcons} name='arrow-back' />}
          />
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
    alignItems: "center",
    justifyContent: "center",
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
