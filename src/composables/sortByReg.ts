import { IFlight } from '@/interfaces/flight';

const compareReg = (flight1: IFlight, flight2: IFlight) => {
	if (flight1.regNumber > flight2.regNumber) { return 1; }
	if (flight1.regNumber < flight2.regNumber) { return -1; }
	return 0;
};
export default function sortByReg(array:IFlight[]):IFlight[] {
	return array.sort(compareReg);
}
