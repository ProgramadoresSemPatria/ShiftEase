import { useState } from "react";
import SelectTimePeriod from "./SelectTimePeriod";
import TimePeriodDropdown from "./TimePeriodDropdown";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import ShiftCard from "./ShiftCard";

interface ShiftRecord {
	[key: string]: string;
}

interface Worker {
	name: string;
	shifts: ShiftRecord;
}

const days = [
	"Mon 24",
	"Tue 25",
	"Wed 26",
	"Thu 27",
	"Fri 28",
	"Sat 29",
	"Sun 30",
];

const workers: Worker[] = [
	{
		name: "Alice",
		shifts: {
			"Mon 24": "09:00 - 17:00",
			"Wed 26": "10:00 - 18:00",
			"Fri 28": "08:00 - 16:00",
		},
	},
	{
		name: "Bob",
		shifts: {
			"Tue 25": "08:00 - 16:00",
			"Thu 27": "12:00 - 20:00",
			"Sat 29": "09:00 - 17:00",
		},
	},
	{
		name: "Charlie",
		shifts: {
			"Mon 24": "12:00 - 20:00",
			"Thu 27": "09:00 - 17:00",
			"Sun 30": "10:00 - 18:00",
		},
	},
	{
		name: "Diana",
		shifts: {
			"Tue 25": "10:00 - 18:00",
			"Wed 26": "09:00 - 17:00",
			"Sat 29": "12:00 - 20:00",
		},
	},
	{
		name: "Edward",
		shifts: {
			"Mon 24": "08:00 - 16:00",
			"Fri 28": "12:00 - 20:00",
			"Sun 30": "09:00 - 17:00",
		},
	},
];
export default function ScheduleTab() {
	const [dropdownPeriod, setDropdownPeriod] = useState<string>("Week");

	return (
		<div className="flex flex-col gap-5 px-5 py-5 rounded-md bg-white w-full">
			<div className="flex gap-3 items-end">
				<SelectTimePeriod />
				<TimePeriodDropdown
					dropdownPeriod={dropdownPeriod}
					setDropdownPeriod={setDropdownPeriod}
				/>
			</div>
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px] text-lg">Name</TableHead>
							{days.map((day, index) => (
								<TableHead
									key={day}
									className={`text-lg ${index % 2 !== 0 ? "bg-gray-100" : ""}`}
								>
									{day}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{workers.map((worker) => (
							<TableRow key={worker.name}>
								<TableCell className="font-medium">{worker.name}</TableCell>
								{days.map((day) => (
									<TableCell key={`${worker.name}-${day}`} className="p-2">
										{worker.shifts[day] && (
											<ShiftCard
												name={worker.name}
												schedule={worker.shifts[day]}
											/>
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
