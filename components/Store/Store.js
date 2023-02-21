import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

// import { dracula } from "react-syntax-highlighter/styles/hljs";
const Store = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
  userRole: null,
  setUserRole: (userRole) => set({ userRole }),
  removeUserRole: () => set({ userRole: null }),
  Babbar: 0,
  setBabbar: (Babbar) => set({ Babbar }),
  removeBabbar: () => set({ Babbar: 0 }),
  Striver: 0,
  setStriver: (Striver) => set({ Striver }),
  removeStriver: () => set({ Striver: 0 }),
  Fraz: 0,
  setFraz: (Fraz) => set({ Fraz }),
  removeFraz: () => set({ Fraz: 0 }),
  AmanDhattarwal: 0,
  setAmanDhattarwal: (AmanDhattarwal) => set({ AmanDhattarwal }),
  removeAmanDhattarwal: () => set({ AmanDhattarwal: 0 }),
  GFG: 0,
  setGFG: (GFG) => set({ GFG }),
  removeGFG: () => set({ GFG: 0 }),
  Blind75: 0,
  setBlind75: (Blind75) => set({ Blind75 }),
  removeBlind75: () => set({ Blind75: 0 }),
  LocalTheme: null,
  setLocalTheme: (LocalTheme) => set({ LocalTheme }),
});

const useStore = create(
  devtools(persist(Store, { name: "userInfo", getStorage: () => AsyncStorage }))
);

export default useStore;
