import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function SelectExchangeShift() {
	return (
		<Select>
			<SelectTrigger className="w-full text-lg">
				<SelectValue placeholder="Select" />
			</SelectTrigger>
			<SelectContent className="w-full text-lg">
				<SelectItem value="shift1" className="text-lg">
					Shift 1
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
