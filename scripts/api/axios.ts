import axios from "axios";

axios.defaults.timeout = 5000;

const BASE_URL = process.env.BASE_URL;

const baseInstance = axios.create({
  baseURL: BASE_URL,
});

export default baseInstance;
