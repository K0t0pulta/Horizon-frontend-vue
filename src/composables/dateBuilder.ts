import { IFlight } from '@/interfaces/flight';

export default function dateBuilder(object: IFlight): number {
	const stringDate = `${object.dateOfFlight}T${object.eobt}:00`;
	const newDate = new Date(stringDate);
	return newDate.getTime();
}

export function dateBuilderFromDateStart(date: string): number {
	const stringDate = `${date}T00:00:00`;
	const newDate = new Date(stringDate);
	return newDate.getTime();
}
export function dateBuilderFromDateEnd(date: string): number {
	const stringDate = `${date}T23:59:59`;
	const newDate = new Date(stringDate);
	return newDate.getTime();
}
