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
        paddingBottom: 7,
        borderRadius: 20,
        borderColor: "#212121",
        marginLeft: 1,
        marginRight: 1,
        marginTop: 5,
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
          onChangeText={(text) => searchFunction(text)}
          placeholder="Topic Name"
          placeholderTextColor="#4d4d4d"
        ></Input>
      </Box>
    </Box>
  );
}
