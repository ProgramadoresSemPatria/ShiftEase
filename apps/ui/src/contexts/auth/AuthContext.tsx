import { createContext } from "react";

export type contextUser = {
	email: string;
	name: string;
};

export type AuthContextType = {
	user: contextUser | null;
	signIn: (email: string, password: string) => Promise<boolean>;
	signOut: () => void;
	signUp: (
		name: string,
		email: string,
		password: string,
		departmentCode: string,
	) => Promise<boolean>;
};
const defaultContextValue: AuthContextType = {
	user: null,
	signIn: async () => false,
	signOut: () => {},
	signUp: async () => false,
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);
