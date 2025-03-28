import { useApi } from "@/hooks/useApi";
import type { User } from "@/types/user";
import { type JSX, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
	const [user, setUser] = useState<User | null>(null);
	const api = useApi();

	useEffect(() => {
		const validateToken = async () => {
			const token = localStorage.getItem("authToken");
			if (token) {
				const data = await api.validateToken(token);
				if (data.user) {
					setUser(data.user);
				} else {
					localStorage.removeItem("authToken");
				}
			}
		};
		validateToken();
	}, [api]);

	const setToken = (token: string) => {
		localStorage.setItem("authToken", token);
	};

	const signIn = async (email: string, password: string) => {
		const data = await api.signIn(email, password);
		if (data.user && data.token) {
			setUser(data.user);
			setToken(data.token);
			return true;
		}
		return false;
	};

	const signOut = async () => {
		setUser(null);
		setToken("");
		await api.signOut();
	};

	return (
		<AuthContext.Provider value={{ user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};
