<template>
	<BlockSchedule @flight-recall="activator"
	@activate-block-flight="isActive = $event"/>
	<BlockFlight v-if="isActive" :activeFlight = choosenFlight :activeFlightId = choosenFlightId
	@hide-block="isActive = $event"/>
        <div class="mainMapContainer">
            <div class="mainMapContainer_mapContainer" id="map"></div>
            <div class="mainMapContainer_toolsContainer"></div>
        </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import BlockSchedule from '@/components/BlockSchedule.vue';
import BlockFlight from '@/components/BlockFlight.vue';
import { IFlight } from '@/interfaces/flight';

const isActive = ref(false);
const choosenFlight = ref({});
const choosenFlightId = ref(0);
function activator(flight: IFlight | 0, status:boolean) {
	choosenFlight.value = flight;
	choosenFlightId.value = flight === 0 ? 0 : flight.id;
	isActive.value = status;
}

</script>
