import { createContext } from "react";

export type contextUser = {
	email: string;
	name: string;
};

export type AuthContextType = {
	user: contextUser | null;
	signIn: (email: string, password: string) => Promise<boolean>;
	signOut: () => void;
};
const defaultContextValue: AuthContextType = {
	user: null,
	signIn: async () => false,
	signOut: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);
