import { Dimensions, StyleSheet, Text } from "react-native";
import React, { useState, useEffect, memo } from "react";
import { Shadow } from "react-native-shadow-2";
import { Box } from "native-base";
import { Checkbox } from "react-native-paper";
import { db } from "../../../Firebase";
import useStore from "../../../components/Store/Store";
import { doc } from "firebase/firestore";
const { width, height } = Dimensions.get("window");
const Difficulty = "Easy";

const QuestionInfoCard = ({ item, index, isDone, sheetName, updateInFB }) => {
  const [checked, setChecked] = useState(false);
  const { user } = useStore((state) => ({
    user: state.user,
  }));
  useEffect(() => {
    if (isDone === true) {
      setChecked(true);
    }
  }, []);

  return (
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
          <Text style={styles.box} fontSize={width * 0.013}>
            {item.problem}
          </Text>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: width * 0.2,
            }}
          >
            <Text style={styles.box6} fontSize={width * 0.01}>
              {Difficulty}
            </Text>
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
    // </TouchableOpacity>
  );
};

export default memo(QuestionInfoCard);

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
