<template>
	<li class="list_flight">
		<label for="*">
			<input type="checkbox" class="list_flight-deleteFlight" v-if="isDeleting" v-model='toDelete'/>
		</label>
		<span class="list_flight_flight-data">
			{{flight.dateOfFlight}} {{flight.eobt}} {{flight.regNumber}} <br/>
			{{airlineData.code}}{{flight.flightId}} {{flight.departure.toUpperCase()}} {{flight.arrival.toUpperCase()}}
		</span>
		<span class="list_flight_flight_open"
		@click.prevent="emit('flightRecall', flight, true)"
		@keydown.space="emit('flightRecall', flight, true)">&#x2192;</span>
	</li>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AirlineStore from '@/stores/AirlineStore';
import { IFlight } from '@/interfaces/flight';

// eslint-disable-next-line no-undef
const props = defineProps<{
	flight: IFlight,
	isDeleting: boolean,
}>();

// eslint-disable-next-line no-undef
const emit = defineEmits<{(event: 'flightRecall', flight: IFlight, isActive: boolean): void
	(event: 'readyToDelete', data: any): void}>();

const airlineData = AirlineStore();

const toDelete = ref(false);
watch(toDelete, (status) => {
	emit('readyToDelete', { id: props.flight.id, isReady: status });
});

</script>

<style scoped>
li {
	margin-left: 0;
}
</style>
