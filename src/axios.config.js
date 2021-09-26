import axios from "axios";

const api = axios.create({
  baseURL: `https://e-prathibha.com/apis`,
  // baseURL: `https://www.errortechnologies.com/quizdemo/apis`,
});

export default api;
