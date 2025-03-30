type Props = {
	name: string;
	schedule: string;
};

export default function ShiftCard({ name, schedule }: Props) {
	return (
		<div className="bg-green-300 text-green-950 p-4 rounded-md font-bold">
			<div>{name}</div>
			<div>{schedule}</div>
		</div>
	);
}
