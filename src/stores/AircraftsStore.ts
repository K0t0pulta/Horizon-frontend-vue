import { defineStore } from 'pinia';
import { IAircraft } from '@/interfaces/aircraft';

export default defineStore('AircraftsStore', {
	state: () => ({
		aircrafts: [] as IAircraft[],
	}),
});
