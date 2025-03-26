import { FeatureCard } from "./FeatureCard";
import { CircleArrowsIcon } from "./icons/CircleArrowsIcon";
import ClockIcon from "./icons/ClockIcon";
import { ConfigurationIcon } from "./icons/ConfigurationIcon";
import { NotificationIcon } from "./icons/NotificationIcon";

export const FeatureSection = () => {
	return (
		<div className="flex flex-col items-center gap-5 px-4 md:px-40 py-5 md:py-10 bg-neutral-950 ">
			<h2 className="font-bold text-2xl">Why Shiftease?</h2>
			<div className="flex  flex-col md:flex-row gap-3">
				<FeatureCard
					icon={<ClockIcon size={35} />}
					title="Shift Visualization"
					description="See your schedule at a glance"
				/>
				<FeatureCard
					icon={<CircleArrowsIcon size={35} />}
					title="Shift swaps"
					description="Easily offer and negotiate swaps"
				/>
				<FeatureCard
					icon={<NotificationIcon size={35} />}
					title="Notifications"
					description="Stay updated with real-time alerts"
				/>
				<FeatureCard
					icon={<ConfigurationIcon size={35} />}
					title="Manager Tools"
					description="Approve swaps and track changes"
				/>
			</div>
		</div>
	);
};
