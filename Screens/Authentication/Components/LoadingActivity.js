import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
// import colors from "../constants/colors";

const LoadingActivity = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator
        size='large'
        color='white'
        animating={true}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: { padding: 8, borderRadius: 4, opacity: 0.9 },
});

export default LoadingActivity;
