import { motion } from "motion/react";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
	return (
		<div className="flex justify-between px-8 py-3 items-center border-b-orange-600 border-b-1 bg-zinc-950">
			<Link to={"/"}>
				<motion.div
					className="text-orange-600 font-bold text-2xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					whileHover={{ scale: 1.15 }}
				>
					Dashboard
				</motion.div>
			</Link>
		</div>
	);
};
