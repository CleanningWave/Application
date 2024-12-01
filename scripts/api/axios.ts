import { API } from "@/constants/Path";
import axios from "axios";

axios.defaults.timeout = 5000;

const baseInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseInstance;
