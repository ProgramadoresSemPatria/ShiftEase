export const formatDayAndDate = (dateStr: string): string => {
	const date = new Date(dateStr);
	const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	const dayOfWeek = dayNames[date.getDay()];
	const dayOfMonth = date.getDate();
	return `${dayOfWeek} ${dayOfMonth}`;
};
