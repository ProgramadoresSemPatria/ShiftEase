import { MenuButton } from "./MenuButton";

export const Header = () => {
	return (
		<div className="flex justify-between px-8 py-3 items-center">
			<img src="logo.svg" alt="shiftease logo" className="max-h-5" />
			<MenuButton />
		</div>
	);
};
