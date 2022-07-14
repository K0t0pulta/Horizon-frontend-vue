import { defineStore } from 'pinia';

export default defineStore('scheduleListStore', {
	state: () => ({
		list: [],
	}),
});
