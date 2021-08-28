import axios from "axios";

const api = axios.create({
  baseURL: `https://e-prathibha.com/apis`,
});

export default api;
