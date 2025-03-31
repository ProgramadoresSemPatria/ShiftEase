import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { ScheduleShift } from "@/types/schedule";
import SelectExchangeShift from "./SelectExchangeShift";

type Props = {
	name: string;
	schedule: string;
	day: string;
	shiftId?: string;
	loggedUserShifts: ScheduleShift[];
};

export default function RequestSwapDialog({
	name,
	schedule,
	day,
	loggedUserShifts,
}: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Request Swap</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="font-bold text-xl">
						Request Shift Swap
					</DialogTitle>
					<DialogDescription className="flex flex-col gap-3">
						<div>
							<div className="text-lg">{name}'s Shift</div>
							<div className="flex border-1 px-2 py-5 justify-between rounded-md font-bold items-center text-lg">
								<div className="text-black">{day}</div>
								<div className="text-green-900">{schedule}</div>
							</div>
						</div>
						<div>
							<div className="text-lg">Selecione seu turno para oferecer:</div>
							<SelectExchangeShift shifts={loggedUserShifts} />
						</div>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="sm:justify-end">
					<DialogClose>
						<Button>Cancel</Button>
					</DialogClose>
					<Button className="bg-orange-500 text-white font-bold shadow-md">
						Send Request
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
