import { defineStore } from 'pinia';

export default defineStore('flightDataStore', {
	state: () => ({
		isActive: false,
	}),
});
