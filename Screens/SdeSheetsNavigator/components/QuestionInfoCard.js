import { Dimensions, StyleSheet, Text, Linking } from "react-native";
import React, { useState, useEffect, memo } from "react";
import { Shadow } from "react-native-shadow-2";
import { Box } from "native-base";
import { Checkbox } from "react-native-paper";
import useStore from "../../../components/Store/Store";
const { width, height } = Dimensions.get("window");
const Difficulty = "Easy";
import LaunchIcon from "@mui/icons-material/Launch";

const QuestionInfoCard = ({ item, index, isDone, sheetName, updateInFB }) => {
  const [checked, setChecked] = useState(false);
  const { user } = useStore((state) => ({
    user: state.user,
  }));
  useEffect(() => {
    if (isDone === true) {
      setChecked(true);
    }
    // console.log("isDone", isDone);
  }, []);

  return (
    <Box style={{ marginBottom: height * 0.015 }}>
      <Shadow Shadow startColor='#292c2f' distance={12} offset={[12, 12]}>
        <Box style={styles.box1}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: width * 0.85,
            }}
          >
            <Text style={styles.box} fontSize={width * 0.5}>
              {item.problem}
            </Text>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                width: width * 0.28,
              }}
            >
              <Text
                onPress={async () => {
                  await Linking.openURL(item.link);
                }}
                style={styles.box7}
              >
                <LaunchIcon sx={{ color: "#aaa9a8" }} />
              </Text>
              <Text style={styles.box6}>{item.topic}</Text>
              <Checkbox
                style={styles.checkbox}
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                  updateInFB(index, !checked);
                }}
                disabled={false}
                uncheckedColor='#484848'
                color='#007b28'
              />
            </Box>
          </Box>
        </Box>
      </Shadow>
    </Box>
  );
};

export default memo(QuestionInfoCard);

const styles = StyleSheet.create({
  box: {
    color: "#fad8bd",
    fontFamily: "GbMed",
    paddingTop: 7.5,
    fontSize: width * 0.0155,
    paddingLeft: width * 0.04,
    marginBottom: height * 0.01,
  },
  box1: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: width * 0.9,
    height: height * 0.08,
    margin: height * 0.015,
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
    backgroundColor: "#26458c",
    // color: "#f9d3b4",
    color: "#d1d1d1",
    borderRadius: 15,
    padding: 10,
    fontSize: width * 0.0125,
  },
  box7: {
    fontFamily: "GbBold",
  },
  checkbox: {
    marginRight: width * 0.4,
  },
});
