import { IFlight } from '@/interfaces/flight';
import dateBuilder from './dateBuilder';

export default function sortByTime(array:IFlight[]):IFlight[] {
	return array.sort((a, b) => dateBuilder(a) - dateBuilder(b));
}
