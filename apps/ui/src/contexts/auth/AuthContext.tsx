import type { User } from "@/types/user";
import { createContext } from "react";

export type AuthContextType = {
	user: User | null;
	signin: (email: string, password: string) => Promise<boolean>;
	signout: () => void;
};
const defaultContextValue: AuthContextType = {
	user: null,
	signin: async () => false,
	signout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);
