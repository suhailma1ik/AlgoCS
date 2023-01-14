import { ToastAndroid } from "react-native";
// import { showShortMessage } from "./ShowSnackbar";
import strings from "./strings";

export const emailValidator = (email) => {
  if (!email) {
    return false;
  }
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return false;
  } else {
    return true;
  }
};

export const validateSignUp = (name, email, password, confirmPassword) => {
  if (
    name === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    ToastAndroid.show(strings.FILL_ALL, ToastAndroid.SHORT);
    return false;
  } else if (emailValidator(email)) {
    ToastAndroid.show(strings.VALID_EMAIL, ToastAndroid.SHORT);
    return false;
  } else if (password !== confirmPassword) {
    // showShortMessage(strings.PWD_NOT_MATCH);
    ToastAndroid.show(strings.PWD_NOT_MATCH, ToastAndroid.SHORT);
    return false;
  } else if (password.length < 6) {
    // showShortMessage(strings.PWD_LENGTH);
    ToastAndroid.show(strings.PWD_LENGTH, ToastAndroid.SHORT);
    return false;
  } else {
    return true;
  }
};

export const arrayMaker = (size) => {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(false);
  }
  return arr;
};
