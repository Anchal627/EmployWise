import axios from "axios";

const URL = "https://reqres.in/api";
const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const fetchAllUser = async (page = 1) => {
  const response = await axios.get(`${URL}/users?page=${page}`);
  return response.data;
};
export const deleteUser = async (id) => {
  await axios.delete(`${URL}/users/${id}`);
};
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${URL}/users/${id}`, userData);
  return response.data;
};
export const login = async (email, password) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};
