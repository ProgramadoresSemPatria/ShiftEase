import { useContext } from "react";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const auth = useContext(AuthContext);
	const location = useLocation();

	if (!auth.user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return children;
};
