import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

type UserResponse = {
	email: string;
	name: string;
};

type SignInResponse = {
	accessToken: string;
};

export const useApi = () => ({
	validateToken: async (): Promise<UserResponse | null> => {
		try {
			const response = await api.get("/users/me");
			return response.data;
		} catch (error) {
			console.error("Token validation failed:", error);
			return null;
		}
	},
	signIn: async (
		email: string,
		password: string,
	): Promise<SignInResponse | null> => {
		try {
			const response = await api.post("/auth/signin", { email, password });
			const token = response.data;
			return token;
		} catch (error) {
			console.error("Sign in failed:", error);
			return null;
		}
	},
	signOut: async (): Promise<{ status: boolean }> => {
		try {
			const response = await api.post("/auth/signout");
			return response.data;
		} catch (error) {
			console.error("Sign out failed:", error);
			return { status: false };
		}
	},
});
