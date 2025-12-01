import axios from "axios";
import { storage } from "../utils/storage";

let base = "http://192.168.15.12:4000";

// WEB usa IP da sua máquina
if (typeof window !== "undefined") {
  base = "http://localhost:4000"; // <-- TROCAR
}

export const api = axios.create({
  baseURL: base,
});

api.interceptors.request.use(async (config) => {
  const token = await storage.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
