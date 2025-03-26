import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MenuButton } from "./MenuButton";

export const Header = () => {
	return (
		<div className="flex justify-between px-8 py-3 items-center border-b-orange-600 border-b-1 rounded-b-sm bg-zinc-950">
			<Link to={"/"}>
				<motion.img
					src="logo.svg"
					alt="shiftease logo"
					className="max-h-5"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					whileHover={{ scale: 1.15 }}
				/>
			</Link>

			{/* Login/Get started */}
			<div className="md:flex gap-5 font-bold hidden text-white">
				<Link to={"/login"} className="cursor-pointer ">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						whileHover={{ scale: 1.15 }}
						className="border-1 border-orange-600 text-orange-600 rounded-md p-2"
					>
						Login
					</motion.div>
				</Link>
				<Link to={"/register"}>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						whileHover={{ scale: 1.15 }}
						className="bg-orange-600 rounded-md p-2"
					>
						Get Started
					</motion.div>
				</Link>
			</div>

			{/* Mobile Menu */}

			<MenuButton />
		</div>
	);
};
