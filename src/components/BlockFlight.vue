<template>
	<section class="flightDataContainer">
		<div class="flightDataContainer_header">
			<span class="flightDataContainer_header_flightNumber"></span>
			<span class="flightDataContainer_header_cross">
				<i class="fa-solid fa-xmark" @click="closeBlock"
				@keypress.space="closeBlock"/>
			</span>
		</div>
		<div class="flightDataContainer_units">ЕДИНИЦЫ ИЗМЕРЕНИЙ: KG, MPH, NM</div>
		<button class="gcDist">dist</button>
		<div class="flightDataContainer_data">
			<form action="" method="post" id="flightDataForm" name="flightDataForm">
				<fieldset class="data_routeData flightDataSub">
					<span class="warning" v-if="warning">
						<img src="/img/triangle-exclamation-solid.svg" alt="there is empty field" srcset="">
					</span>
					<label for="flightID">FLIGHT {{airlineData.code}}
						<input class="flightData_input" type="text" name="flightId" id="flightId"
						maxlength="4" v-model="flightId" :class="{empty: !flightId}">
					</label>
					<div class="formSorter">
						<label for="dateOfFlight">DATE
							<input class="flightData_input" type="date" name="dateOfFlight"
							id="dateOfFlight" required v-model="dateOfFlight" :class="{empty: !dateOfFlight}">
						</label>
						<label for="eobt">EOBT
							<input class="flightData_input" type="time" name="eobt" id="eobt" required
							v-model="eobt" :class="{empty: !eobt}">
						</label>
					</div>
					<label for="regNumber">REG
						<select id="regNumber" name="regNumber" class="flightData_input"
						v-model="regNumber" required
						:class="{empty: regNumber === 'выберите ВС'}">
							<option value="выберите ВС" disabled selected hidden>выберите ВС</option>
							<option v-for="aircraft in aircraftList" :value="aircraft.registration"
							:key="aircraft.msn">{{ aircraft.registration }}</option>
						</select>
					</label>
					<div class="formSorter">
						<label for="departure">DEP
							<input class="flightData_input" type="text" name="departure"
							id="departure" list="departureList" v-model="departure" required
							:class="{empty: !departure}">
						</label>
						<datalist id="departureList"></datalist>
						<label for="arrival">ARR
							<input class="flightData_input" type="text" name="arrival"
							id="arrival" list="arrivalList" v-model="arrival" required :class="{empty: !arrival}">
						</label>
						<datalist id="arrivalList"></datalist>
					</div>
				</fieldset>
				<fieldset class="data_otherData flightDataSub">
					<button @click.prevent="addAlternateAirport">Добавить запасной аэродром</button>
					<label for="altn1">ALTN 1
						<input class="flightData_input" type="text" name="altn1" id="altn1"
						v-model="altn1">
					</label>
					<label for="speed">SPEED
						<input class="flightData_input" type="text" name="speed" id="speed"
						v-model="speed">
					</label>
					<label for="maxFlightLevel">MAX FL
						<input class="flightData_input" type="text" name="maxFlightLevel" id="maxFlightLevel"
						v-model="maxFlightLevel">
					</label>
					<button class="flightData_button dotted basicButtonColors"
					id="flightData_button-enrouteALTN">ЗАПАСНЫЕ ПО МАРШРУТУ</button>
				</fieldset>
				<fieldset class="data_massData flightDataSub">
					<label for="dryOperationWeight">DOW
						<input class="flightData_input" type="number" name="dryOperationWeight" id="dryOperationWeight"
						v-model="dryOperationWeight">
					</label>
					<label for="payload">PLD
						<input class="flightData_input" name="payload" id="payload"
						v-model.number="payload">
					</label>
					<div class="formSorter">
						<label for="estZeroFuelWeight">EZFW
							<input class="flightData_input" name="estZeroFuelWeight" id="estZeroFuelWeight"
							v-model.number="estZeroFuelWeight">
						</label>
						<label for="maxZerofuelWeight">MZFW
							<input class="flightData_input" type="number"
							name="maxZerofuelWeight" id="maxZerofuelWeight"
							v-model="maxZerofuelWeight">
						</label>
					</div>
					<div class="formSorter">
						<label for="estTakeoffWeight">ETOW
							<input class="flightData_input" type="number" name="estTakeoffWeight" id="estTakeoffWeight"
							v-model="estTakeoffWeight">
						</label>
						<label for="maxTakeoffWeight">MTOW
							<input class="flightData_input" type="number" name="maxTakeoffWeight" id="maxTakeoffWeight"
							>
						</label>
					</div>
					<div class="formSorter">
						<label for="estLandingWeight">ELDW
							<input class="flightData_input" type="number" name="estLandingWeight" id="estLandingWeight">
						</label>
						<label for="maxLandingWeight">MLDW
							<input class="flightData_input" type="number" name="maxLandingWeight" id="maxLandingWeight"
							>
						</label>
					</div>
				</fieldset>
				<fieldset class="data_fuelData flightDataSub">
					<label for="taxiOut">TAXI OUT
						<input class="flightData_input" type="number" name="taxiOut" id="taxiOut"
						:value="airlineData.taxiOut">
					</label>
					<div class="formSorter">
						<label for="hold">HOLD
							<input class="flightData_input" type="number" name="hold" id="hold"
							:value="airlineData.hold">
						</label>
						<label for="coningency">CONTINGENCY
							<input class="flightData_input" type="number" name="coningency"
							id="coningency" :value="airlineData.contingency">
						</label>
					</div>
					<label for="ballast">BALLAST
						<input class="flightData_input" type="number" name="ballast" id="ballast">
					</label>
					<div  class="formSorter">
						<label for="mandatory">MANDATORY
							<input class="flightData_input" type="number" name="mandatory"
							id="mandatory">
						</label>
						<label for="extra">EXTRA
							<input class="flightData_input" type="number" name="extra" id="extra">
						</label>
					</div>
					<div class="formSorter">
						<label for="blockFuel">BLOCK FUEL
							<input class="flightData_input" type="number" name="blockFuel"
							id="blockFuel">
						</label>
						<label for="landingFuel">LANDING FUEL
							<input class="flightData_input" type="number" name="landingFuel"
							id="landingFuel">
						</label>
					</div>
					<label for="tankeringFuel">TANKERING FUEL
						<input class="flightData_input" type="checkbox" name="tankeringFuel"
						id="tankeringFuel">
					</label>
					<button class="flightData_button dotted basicButtonColors"
						id="flightData_button-remarks">РЕМАРКИ</button>
				</fieldset>
			</form>
				<div class="data_infoData flightDataSub">
					<div class="data_infoData_buttonsContainer">
						<button class="flightData_button infoData_button basicButtonColors"
						id="infoData_button-info">INFO</button>
						<button class="flightData_button infoData_button basicButtonColors"
						id="infoData_button_wx">WX</button>
						<button class="flightData_button infoData_button basicButtonColors"
						id="infoData_button-notams">NOTAMS</button>
					</div>
				</div>
			<div class="flightDataContainer_buttons">
				<button class="flightData_button mainButtons basicButtonColors" id="button-save"
				form="flightDataForm" type="button" @click="saveFlight" >СОХРАНИТЬ</button>
				<button class="flightData_button mainButtons basicButtonColors"
				id="button-compute" form="flightDataForm" formtarget="_blank" :disabled="warning">
					РАССЧИТАТЬ
				</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import {
	ref, watch, computed, toRef, toRefs, reactive,
} from 'vue';
import schdeduleListStore from '@/stores/schdeduleListStore';
import AircraftsStore from '@/stores/AircraftsStore';
import AirlineStore from '@/stores/AirlineStore';

const airlineData = AirlineStore();
const aircraftList = AircraftsStore().aircrafts;
const flightList = schdeduleListStore().list;

// eslint-disable-next-line no-undef
const props = defineProps({
	activeFlight: Object,
	activeFlightId: Number,
});

const choosenFlightId = toRef(props, 'activeFlightId');
const flightForm = reactive({});
Object.assign(flightForm, props.activeFlight);

const {
	flightId = ref(), dateOfFlight = ref(''), eobt = ref(''), regNumber = ref('выберите ВС'),
	departure = ref(''), arrival = ref(''), altn1 = ref(''),
	speed = ref(''), maxFlightLevel = ref<string|number>(''), payload = ref(0),
	dryOperationWeight = ref<number|string>(''),
	estTakeoffWeight = ref<string|number>(''),
	maxZerofuelWeight = ref<string|number>(''),
} = toRefs(flightForm);
const warning = ref(false);

// const { maxZerofuelWeight } = toRefs(aircraft);
const activeAircraft = reactive({});
watch(regNumber, (newValue: string) => {
	Object.assign(activeAircraft, aircraftList.find((plane) => plane.registration === newValue));
	speed.value = activeAircraft.speed;
	maxFlightLevel.value = activeAircraft.maxFlightLevel;
	dryOperationWeight.value = activeAircraft.basicWeight;
	// estZeroFuelWeight.value = Number(activeAircraft.basicWeight) + payload.value;
});

const estZeroFuelWeight = computed(() => dryOperationWeight.value + payload.value);

// заполнение формы

// собираем все значения input из формы  как объект и сохраняем в массив
function saveFlight() {
	const flightFormElements = document.forms.flightDataForm.elements;
	const form = Array.from(flightFormElements);
	const formFiltered = form.filter((el) => el.tagName === 'INPUT' || el.tagName === 'SELECT');
	const flight = {};
	formFiltered.forEach((el) => {
		flight[el.id] = el.value.toUpperCase();
	});
	flight.id = Date.now();
	flightList.push(flight);
}

// eslint-disable-next-line no-undef
const emit = defineEmits<{(event: 'hideBlock', isActive: boolean): void}>();

function closeBlock() {
	emit('hideBlock', false);
	choosenFlightId.value = 0;
}
</script>

<style scoped>
.warning:hover::after {
content: 'Имеются незаполненные поля...';
padding: 0 5px;
color: rgb(214, 48, 18);
border: 1px solid black;
background-color: #fff;
white-space: nowrap;
position: relative;
left: -200%
}

.empty {
	border: 2px solid rgb(214, 48, 18);
}

.formSorter {
	margin: 3px 0;
	display: flex;
	justify-content: space-around;
}
</style>
