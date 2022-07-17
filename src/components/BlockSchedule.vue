<template>
	<section class="scheduleContainer">
		<div class="sheduleContainer_header">
			<h3 class="sheduleContainer_header_title">Расписание</h3>
			<div class="sheduleContainer_header_sorter">
				<div class="sorter_sortBy">
						<span>Сортировать</span>
						<label for="sortReg" :class="[activeSort === 'sortReg' ? activeClass : inActiveClass]">
							<input type="radio" name="sort" id="sortReg"
							value="sortReg" v-model="activeSort"
							@click="sortByReg(scheduleList)">
						REG</label>
						<label for="sortTime" :class="[activeSort === 'sortTime' ? activeClass : inActiveClass]">
							<input type="radio" name="sort" id="sortTime"
							value="sortTime" v-model="activeSort"
							@click="sortByTime(scheduleList)">
						TIME</label>
				</div>
				<div class="sorter_filter formSorter">
					<label for="dateFrom">Фильтр с
						<input type="date" class="dateFrom" id="dateFrom" v-model="dateStart"></label>
					<label for="dateTill">по
						<input type="date" class="dateTill" id="dateTill" v-model="dateEnd"></label>
				</div>
			</div>
		</div>
			<div class="scheduleContainer_buttons">
					<button class="addFlight scheduleButton basicButtonColors"
					id="addFlightButton" @click.prevent="emit('flightRecall', {} as IFlight, true)">
					Добавить</button>
					<button class="updateSchedule scheduleButton basicButtonColors"
					id="updateFlightButton"><i class="fa-solid fa-arrows-rotate"></i></button>
					<button class="deleteFlight scheduleButton basicButtonColors"
					id="deleteFlightButton">Удалить</button>
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
import ScheduleItem from '@/components/ScheduleItem.vue';
import schdeduleListStore from '@/stores/schdeduleListStore';
import { IFlight } from '@/interfaces/flight';
import sortByTime from '@/composables/sortByTime';
import sortByReg from '@/composables/sortByReg';
import { ref, computed, watch } from 'vue';
import dateFormater from '@/composables/dateFormater';
import dateBuilder, { dateBuilderFromDateStart, dateBuilderFromDateEnd } from '@/composables/dateBuilder';

// раздел сортировки
const activeClass = ref('activeSorter');
const inActiveClass = ref('inActiveSorter');
const activeSort = ref('sortTime');

// Раздел фильтрации
const date = new Date();
const dateStart = ref('');
const dateEnd = ref('');
dateStart.value = `${date.getFullYear()}-${dateFormater(date.getMonth() + 1)}-${dateFormater(date.getDate() - 1)}`;
dateEnd.value = `${date.getFullYear()}-${dateFormater(date.getMonth() + 1)}-${dateFormater(date.getDate() + 1)}`;

// формируем список рейсов основываясь на датах фильтрации
const scheduleList = computed(() => schdeduleListStore().list.filter((flight) => dateBuilder(flight)
>= dateBuilderFromDateStart(dateStart.value)
&& dateBuilder(flight) <= dateBuilderFromDateEnd(dateEnd.value)) || []);

// сортируем автоматически при добавлении рейса
watch(scheduleList, () => {
	if (activeSort.value === 'sortReg') return console.log(sortByReg(scheduleList.value));
	return sortByTime(scheduleList.value);
});
// eslint-disable-next-line no-undef
const emit = defineEmits<{(event: 'activateBlockFlight', isActive: boolean): void,
	(event: 'flightRecall', flight: IFlight, isActive: boolean): void
	}>();
</script>

<style scoped>
.activeSorter{
	box-shadow: none;
	font-weight: 600;
}
.inActiveSorter{
	box-shadow: inset 5px 6px 15px rgb(0 0 0 / 58%);
}
</style>
