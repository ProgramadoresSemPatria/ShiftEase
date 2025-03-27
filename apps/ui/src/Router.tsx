import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { LandingPage } from "./pages/LandingPage";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<DefaultLayout />}>
				<Route index element={<LandingPage />} />
			</Route>
		</Routes>
	);
};
