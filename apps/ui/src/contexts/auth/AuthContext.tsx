import type { User } from "@/types/user";
import { createContext } from "react";

export type AuthContextType = {
	user: User | null;
	signIn: (email: string, password: string) => Promise<boolean>;
	signOut: () => void;
};
const defaultContextValue: AuthContextType = {
	user: null,
	signIn: async () => false,
	signOut: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);
