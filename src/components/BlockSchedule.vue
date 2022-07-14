<template>
	<section class="scheduleContainer">
		<div class="sheduleContainer_header">
			<div class="sheduleContainer_header_title">Расписание</div>
			<div class="sheduleContainer_header_sorter">
				<div class="sorter_sortBy">
						<span>Сортировать по</span>
						<label for="sortReg">
							<input type="radio" name="sort" id="sortReg">
						REG</label>
						<label for="sortTime">
							<input type="radio" name="sort" id="sortTime" checked>
						TIME</label>
				</div>
				<div class="sorter_filter">
					<label for="dateFrom">период с
						<input type="date" class="dateFrom" id="dateFrom"><br></label>
					<label for="dateTill">по
						<input type="date" class="dateTill" id="dateTill"></label>
				</div>
			</div>
		</div>
			<div class="scheduleContainer_buttons">
					<button class="addFlight scheduleButton basicButtonColors"
					id="addFlightButton" @click.prevent="emit('flightRecall', 0, true)">Добавить рейс</button>
					<button class="updateSchedule scheduleButton basicButtonColors"
					id="updateFlightButton"><i class="fa-solid fa-arrows-rotate"></i></button>
					<button class="deleteFlight scheduleButton basicButtonColors"
					id="deleteFlightButton">Удалить рейс</button>
			</div>
			<div class="scheduleContainer_listContainer">
					<ul class="scheduleContainer_listContainer_list" id="flightList">
						<ScheduleItem v-for='flight in scheduleList' :key="flight.id" :flight="flight"
						@flight-recall="(flight, status) => emit('flightRecall', flight, status)"/>
					</ul>
			</div>
	</section>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import ScheduleItem from '@/components/ScheduleItem.vue';
import schdeduleListStore from '@/stores/schdeduleListStore';
import { IFlight } from '@/interfaces/flight';

const scheduleList: IFlight[] = schdeduleListStore().list;

const emit = defineEmits<{(event: 'activateBlockFlight', isActive: boolean): void,
	(event: 'flightRecall', flight: IFlight | 0, isActive: boolean): void
	}>();
</script>
