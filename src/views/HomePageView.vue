<template>
	<div class="container">
		<BlockHeader/>
		<div class="mainBody">
			<router-view></router-view>
		</div>
		<BlockFooter :connectionStatus="connectionStatus"/>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BlockHeader from '@/components/BlockHeader.vue';
import BlockFooter from '@/components/BlockFooter.vue';
import AircraftsStore from '@/stores/AircraftsStore';
import Client from '@/composables/websocket';

const connectionStatus = ref<string | undefined>('');
Client.init((el) => {
	try {
		connectionStatus.value = el;
	} catch (e) {
		console.log(`Error: ${e}`);
	}
});

watch(connectionStatus, (status) => {
	if (status === 'Online') {
		Client.requestAircraftsList((list) => {
			AircraftsStore().aircrafts = list;
		});
	}
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
