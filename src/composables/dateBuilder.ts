import { IFlight } from '@/interfaces/flight';

export default function dateBuilder(object: IFlight): number {
	const stringDate = `${object.dateOfFlight}T${object.eobt}:00`;
	const newDate = new Date(stringDate);
	return newDate.getTime();
}
