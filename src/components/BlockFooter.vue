<template>
    <footer :class="{isWarning: isWarning}">Status: {{connectionStatus}}</footer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// eslint-disable-next-line no-undef
const props = defineProps<{
    connectionStatus: string | undefined,
}>();
const isWarning = ref(false);
watch(() => props.connectionStatus, (newValue) => {
	if (newValue === 'Online') {
		isWarning.value = false;
	} else {
		isWarning.value = true;
	}
});
</script>

<style scoped>

</style>
