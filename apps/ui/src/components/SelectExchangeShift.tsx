import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { ScheduleShift } from "@/types/schedule";

type Props = {
	shifts: ScheduleShift[];
};

export default function SelectExchangeShift({ shifts }: Props) {
	console.log(shifts);
	const formatDisplayDate = (date: string) => {
		const dateFormated = new Date(date);
		const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		return `${dayNames[dateFormated.getUTCDay()]} ${dateFormated.getUTCDate()}`;
	};

	return (
		<Select>
			<SelectTrigger className="w-full text-lg">
				<SelectValue placeholder="Select" />
			</SelectTrigger>
			<SelectContent className="w-full text-lg">
				{shifts.map((shift) => (
					<SelectItem key={shift.id} value={shift.id} className="text-lg">
						{formatDisplayDate(shift.date)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
