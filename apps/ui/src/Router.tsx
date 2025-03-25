import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<DefaultLayout />}>
			</Route>
		</Routes>
	);
};
