<template>
    <ul> БД ВС
        <li v-for="aircraft in aircraftList" :key="aircraft.msn">{{aircraft.registration}}</li>
    </ul>
</template>

<script setup lang="ts">
import AircraftsStore from '@/stores/AircraftsStore';

const aircraftList = AircraftsStore().aircrafts;

</script>

<style>
li {
    margin-left: 20px;
}
</style>
