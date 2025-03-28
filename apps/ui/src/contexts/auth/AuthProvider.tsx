import { useApi } from "@/hooks/useApi";
import { type JSX, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { contextUser } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
	const [user, setUser] = useState<contextUser | null>(null);
	const api = useMemo(() => useApi(), []);

	useEffect(() => {
		const validateToken = async () => {
			const token = localStorage.getItem("accessToken");
			if (token) {
				const data = await api.validateToken();
				if (data) {
					console.log(data);
					setUser(data);
				} else {
					localStorage.removeItem("accessToken");
				}
			}
		};
		validateToken();
	}, [api]);

	const setToken = (token: string) => {
		localStorage.setItem("accessToken", token);
	};

	const signIn = async (email: string, password: string) => {
		const data = await api.signIn(email, password);
		if (data?.accessToken) {
			setToken(data.accessToken);
			const userData = await api.validateToken();
			if (userData) {
				setUser(userData);
				return true;
			}
		}
		return false;
	};

	const signOut = async () => {
		setUser(null);
		localStorage.removeItem("accessToken");
		await api.signOut();
	};

	return (
		<AuthContext.Provider value={{ user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};
