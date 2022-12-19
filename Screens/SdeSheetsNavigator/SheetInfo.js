import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Text, useColorMode } from "native-base";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { Shadow } from "react-native-shadow-2";
const { width, height } = Dimensions.get("window");

export default function SheetInfo({ navigation, route }) {
  const [topics, setTopics] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "SDESheets");
    getDocs(colRef).then((querySnapshot) => {
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
      // console.log(data);
    });
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, []);

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
      <FlatList
        data={topics}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <Shadow
                distance={5}
                startColor='#000'
                endColor='#000'
                opacity={0.2}
                radius={5}
                style={{
                  width: width * 0.9,
                  height: height * 0.1,
                  borderRadius: 10,
                  marginVertical: height * 0.01,
                  backgroundColor: "#fff",
                  alignSelf: "center",
                }}
              >
                <Box
                  style={{
                    width: width * 0.9,
                    height: height * 0.1,
                    borderRadius: 10,
                    marginVertical: height * 0.01,
                    backgroundColor: "#fff",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "GbMed",
                      fontSize: 20,
                      color: "#1c1f20",
                      marginLeft: width * 0.05,
                      marginTop: height * 0.03,
                    }}
                  >
                    {item.topic}
                  </Text>
                </Box>
              </Shadow>
            </TouchableOpacity>
          );
        }}
      />
    </Box>
  );
}

const styles = StyleSheet.create({});
