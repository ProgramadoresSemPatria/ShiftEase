import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./ui/layouts/DefaultLayout";
import { LandingPage } from "./ui/pages/LandingPage";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<DefaultLayout />}>
				<Route index element={<LandingPage />} />
			</Route>
		</Routes>
	);
};
