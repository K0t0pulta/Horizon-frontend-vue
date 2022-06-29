import { defineStore } from 'pinia';

export default defineStore('airlineStore', {
	state: () => ({
		code: 'RSY',
		taxiOut: 15,
		taxiIn: 5,
		hold: 30,
		contingency: 5,
	}),
});
