import { defineStore } from 'pinia';

export default defineStore('AircraftsStore', {
	state: () => ({
		aircrafts: [
			{
				msn: 1256,
				type: 'A333',
				registration: 'RA-73684',
				maxTaxiWeight: 235900,
				maxTakeoffWeight: 235000,
				maxLandingWeight: 187000,
				maxZerofuelWeight: 175000,
				basicWeight: 121737,
				maxFlightLevel: 410,
				speed: 'LRC',
			},
			{
				msn: 1021,
				type: 'A333',
				registration: 'RA-73685',
				maxTaxiWeight: 235900,
				maxTakeoffWeight: 235000,
				maxLandingWeight: 187000,
				maxZerofuelWeight: 173000,
				basicWeight: 115185,
				maxFlightLevel: 410,
				speed: 'LRC',
			},
			{
				msn: 965,
				type: 'A333',
				registration: 'RA-73686',
				maxTaxiWeight: 235900,
				maxTakeoffWeight: 235000,
				maxLandingWeight: 187000,
				maxZerofuelWeight: 173000,
				basicWeight: 122044,
				maxFlightLevel: 410,
				speed: 'LRC',
			},
		],
	}),
});
