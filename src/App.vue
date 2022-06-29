<template>
  <BlockHeader/>
  <div class="mainBody">
    <router-view></router-view>
  </div>
  <BlockFooter :connectionStatus="connectionStatus"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BlockHeader from './components/BlockHeader.vue';
import BlockFooter from './components/BlockFooter.vue';

const connection = new WebSocket('ws://127.0.0.1:8082');
const connectionStatus = ref('');
connection.onopen = () => {
	connectionStatus.value = 'Online';
};
connection.onclose = () => {
	connectionStatus.value = 'Offline';
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
