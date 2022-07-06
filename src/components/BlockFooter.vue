<template>
    <footer :class="{isWarning: isWarning}">Status: {{connectionStatus}}</footer>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

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
footer {
	padding-left: 10px;
	font-weight: 600;
	background-color: rgb(39, 167, 56);
}
.isWarning {
	background-color: rgb(214, 48, 18);
}
</style>
