<template>
	<li class="list_flight">
		<span class="list_flight_flight-data">
			{{flight.dateOfFlight}} {{flight.eobt}} {{airlineData.code}}
			{{flight.flightId}} {{flight.departure.toUpperCase()}} {{flight.arrival.toUpperCase()}}
		</span>
		<span class="list_flight_flight_open"
		@click.prevent="emit('flightRecall', flight, true)"
		@keydown.space="emit('flightRecall', flight, true)">&#x2192;</span>
	</li>
</template>

<script setup lang="ts">
import AirlineStore from '@/stores/AirlineStore';
import { IFlight } from '@/interfaces/flight';

const airlineData = AirlineStore();

// eslint-disable-next-line no-undef
defineProps<{
	flight: IFlight,
}>();

// eslint-disable-next-line no-undef
const emit = defineEmits<{(event: 'flightRecall', flight: IFlight, isActive: boolean): void}>();

</script>

<style scoped>
li {
	margin-left: 0;
}
</style>
