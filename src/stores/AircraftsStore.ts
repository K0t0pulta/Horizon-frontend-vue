import { defineStore } from 'pinia';

export default defineStore('AircraftsStore', {
	state: () => ({
		aircrafts: [],
	}),
});
