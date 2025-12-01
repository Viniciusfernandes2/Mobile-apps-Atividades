import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const storage = {
  async get(key) {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    }
    return await AsyncStorage.getItem(key);
  },

  async set(key, value) {
    if (Platform.OS === "web") {
      return localStorage.setItem(key, value);
    }
    return await AsyncStorage.setItem(key, value);
  },

  async remove(key) {
    if (Platform.OS === "web") {
      return localStorage.removeItem(key);
    }
    return await AsyncStorage.removeItem(key);
  },

  async clear() {
    if (Platform.OS === "web") {
      return localStorage.clear();
    }
    return await AsyncStorage.clear();
  },
};
