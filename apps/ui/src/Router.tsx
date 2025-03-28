import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { PrivateLayout } from "./layouts/PrivateLayout";
import { Dashboard } from "./pages/Dashboard";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<DefaultLayout />}>
				<Route index element={<LandingPage />} />
			</Route>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/app" element={<PrivateLayout />}>
				<Route index element={<Dashboard />} />
			</Route>
		</Routes>
	);
};
