import { IFlight } from '@/interfaces/flight';
import { defineStore } from 'pinia';

export default defineStore('scheduleListStore', {
	state: () => ({
		list: [] as IFlight[],
	}),
});
