import { RequireAuth } from "@/contexts/auth/RequireAuth";
import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
	return (
		<RequireAuth>
			<Outlet />
		</RequireAuth>
	);
};
