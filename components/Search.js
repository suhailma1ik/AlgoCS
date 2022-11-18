import { Box, Input } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default function Search({ searchFunction }) {
  return (
    <Box
      _dark={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#181818",
        paddingTop: 7,
        paddingBottom: 5,
        borderRadius: 20,
        borderColor: "#212121",
        marginLeft: 1,
        marginRight: 1,
        marginTop: 5,
        marginBottom: 2,
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
        <Input
          _dark={{
            bg: "#969696",
            color: "#fff",
            borderRadius: 10,
            fontFamily: "GbMed",
            marginLeft: 1,
            marginRight: 1,
            width: width * 0.8,
          }}
          onChangeText={(text) => searchFunction(text)}
          placeholder="Search Topic Name"
          placeholderTextColor="#4d4d4d"
        ></Input>
      </Box>
    </Box>
  );
}
