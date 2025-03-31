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
import SelectExchangeShift from "./SelectExchangeShift";

type Props = {
	name: string;
	schedule: string;
};

export default function RequestSwapDialog({ name, schedule }: Props) {
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
							<div className="flex border-1 px-2 py-5 justify-between rounded-md font-bold items-center  text-lg">
								<div className="text-black">Wed 26</div>
								<div className="text-green-900">{schedule}</div>
							</div>
						</div>
						<div>
							<div className="text-lg">Select your shift to offer:</div>

							<SelectExchangeShift day="Wed 26" schedule={schedule} />
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
