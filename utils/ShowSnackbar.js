import { ToastAndroid } from "react-native";

export const showShortMessage = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const showMessageWithAction = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const showIndefeniteMessage = (message) => {
  // Snackbar.show({
  //   text: message,
  //   duration: Snackbar.LENGTH_INDEFINITE,
  //   action: {
  //     text: "OK",

  //     onPress: () => {
  //       /* Do something. */
  //     },
  //   },
  // });
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
