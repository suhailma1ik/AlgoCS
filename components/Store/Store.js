import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
const Store = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
  userRole: null,
  setUserRole: (userRole) => set({ userRole }),
  removeUserRole: () => set({ userRole: null }),
  key: null,
  setKey: (key) => set({ key }),
  removeKey: () => set({ key: null }),
  LocalTheme: null,
  setLocalTheme: (LocalTheme) => set({ LocalTheme }),
  removeLocalTheme: () => set({ LocalTheme: null }),
});

const useStore = create(
  devtools(persist(Store, { name: "userInfo", getStorage: () => AsyncStorage }))
);

export default useStore;
