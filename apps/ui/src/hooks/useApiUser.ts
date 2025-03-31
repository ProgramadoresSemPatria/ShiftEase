import { api } from "@/services/api";
import type { Role } from "@/types/enums";

type UserResponse = {
	id: string;
	email: string;
	name: string;
	role: Role;
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
