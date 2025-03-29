import { api } from "@/services/api";

type UserResponse = {
	email: string;
	name: string;
};

export const useApiUser = () => ({
	validateToken: async (): Promise<UserResponse | null> => {
		try {
			const response = await api.get("/users/me");
			return response.data;
		} catch (error) {
			console.error("Token validation failed:", error);
			return null;
		}
	},
});
