import { User } from "@/models/user";
import api from "@/network/axiosInstance";

export async function getAuthenticatedUser() {
  const response = await api.get<User>("/users/me");
  return response.data;
}

interface SignUpValues {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpValues) {
  const response = await api.post<User>("/users/signup", credentials);
  return response.data;
}

interface LoginValues {
  username: string;
  password: string;
}

export async function login(credentials: LoginValues) {
  const response = await api.post<User>("/users/login", credentials);
  return response.data;
}

export async function logout() {
  await api.post("/users/logout");
}