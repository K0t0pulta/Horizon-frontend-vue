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
import Client from './composables/websocket';

const connectionStatus = ref<string | undefined>('');
Client.init((el) => {
	connectionStatus.value = el;
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
