import axios from "axios";

const useApi = () => {
  const API_URL = "http://127.0.0.1:8000"
//   const API_URL = "https://pc-builder-api-eabc.onrender.com"

  const api = axios.create({
    baseURL: API_URL,
  });

  return api;
};

export default useApi;
