import type { User } from "@/types/user";
import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("authToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const useApi = () => ({
	validateToken: async (token: string) => {
		try {
			const response = await api.post("/validate", { token });
			return response.data;
		} catch (error) {
			console.error("Token validation failed:", error);
			return { user: null };
		}
	},
	signin: async (email: string, password: string) => {
		try {
			const response = await api.post("/signin", { email, password });
			return response.data;
		} catch (error) {
			console.error("Sign in failed:", error);
			return null;
		}
	},
	signout: async () => {
		try {
			const response = await api.post("/signout");
			return response.data;
		} catch (error) {
			console.error("Sign out failed:", error);
			return { status: false };
		}
	},
});
