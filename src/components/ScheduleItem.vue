<template>
	<li class="list_flight">
		<span class="list_flight_flight-data">
			{{flight.dateOfFlight}} {{flight.eobt}} {{airlineData.code}}
			{{flight.flightId}} {{flight.departure}} {{flight.arrival}}
		</span>
		<span class="list_flight_flight_open"
		@click.prevent="emit('flightRecall', flight, true)"
		@keydown.space="emit('flightRecall', flight, true)">&#x2192;</span>
	</li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import AirlineStore from '@/stores/AirlineStore';

const airlineData = AirlineStore();

defineProps<{
	flight: Record<string, unknown>,
}>();

// function doFillForm(someFlight: Record<string, unknown>) {
// const form = document.forms.flightDataForm.elements;
// for (let i = 0; i < form.length; i += 1) {
// if (form[i].id === '') i += 1;
// form[i].value = someFlight[form[i].id];
// }
// }

const emit = defineEmits<{(event: 'flightRecall', flight: object, isActive: boolean): void}>();

</script>
