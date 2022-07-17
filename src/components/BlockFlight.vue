<template>
	<section class="flightDataContainer">
		<div class="flightDataContainer_header">
			<span>ЕДИНИЦЫ ИЗМЕРЕНИЙ: KG, MPH, NM</span>
			<span class="flightDataContainer_header_cross">
				<font-awesome-icon icon="fa-solid fa-xmark" @click="closeBlock"
				@keypress.space="closeBlock"/>
			</span>
		</div>
		<div class="flightDataContainer_data">
			<form action="" method="post" id="flightDataForm" name="flightDataForm">
				<fieldset class="data_routeData flightDataSub">
					<span class="warning" v-if="warning">
						<img src="/img/triangle-exclamation-solid.svg" alt="there is empty field" srcset="">
					</span>
					<label for="flightID">FLIGHT {{airlineData.code}}
						<input class="flightData_input" type="text" name="flightId" id="flightId"
						maxlength="4" v-model="flightData.flightId" :class="{empty: !flightData.flightId}"
						@keydown="inputLettersNumbers">
					</label>
					<div class="formSorter">
						<label for="dateOfFlight">DATE
							<input class="flightData_input" type="date" name="dateOfFlight"
							id="dateOfFlight" required v-model="flightData.dateOfFlight"
							:class="{empty: !flightData.dateOfFlight}">
						</label>
						<label for="eobt">EOBT
							<input class="flightData_input" type="time" name="eobt" id="eobt" required
							v-model="flightData.eobt" :class="{empty: !flightData.eobt}">
						</label>
					</div>
					<div class="formSorter">
						<label for="regNumber">REG
							<select id="regNumber" name="regNumber" class="flightData_input"
							v-model="flightData.regNumber" required
							:class="{empty: flightData.regNumber === 'выберите ВС'}">
								<option value="выберите ВС" disabled selected hidden>выберите ВС</option>
								<option v-for="aircraft in aircraftList" :value="aircraft.registration"
								:key="aircraft.msn">{{ aircraft.registration }}</option>
							</select>
						</label>
					</div>
						<div class="formSorter">
							<label for="departure">DEP
								<input class="flightData_input" type="text" name="departure" autocomplete="off"
								id="departure" v-model="flightData.departure" required minlength="3" maxlength="4"
								:class="{empty: !flightData.departure}"	@keydown="inputOnlyLetters">
								{{choosenDeparture.name}}
							</label>
						</div>
						<div class="formSorter">
							<label for="arrival">ARR
								<input class="flightData_input" type="text" name="arrival" autocomplete="off"
								id="arrival" v-model="flightData.arrival" required minlength="3" maxlength="4"
								:class="{empty: !flightData.arrival}" @keydown="inputOnlyLetters">
								{{choosenArrival.name}}
							</label>
						</div>
						<div>
							<span v-show="GreatCircleDistMain > 0">
							Ортодромическое расстояние: {{GreatCircleDistMain}} км</span>
						</div>
				</fieldset>
				<fieldset class="data_otherData flightDataSub">
					<button id="flightData_button-addAltn" @click.prevent="">Добавить запасной аэродром</button>
					<div class="formSorter">
						<label for="altn1">ALTN 1
							<input class="flightData_input" type="text" name="altn1" id="altn1"
							autocomplete="off" maxlength="4" v-model="flightData.altn1" @keydown="inputOnlyLetters">
							{{choosenAltn1.name}}
						</label>
						<span v-show="GreatCircleDistAltn1 > 0">
						Ортодромическое расстояние: {{GreatCircleDistAltn1}} км</span>
					</div>
					<div class="formSorter">
						<label for="speed">SPEED
							<input class="flightData_input" type="text" name="speed" id="speed"
							v-model="flightData.speed">
						</label>
						<label for="maxFlightLevel">MAX FL
							<input class="flightData_input" type="text" name="maxFlightLevel" id="maxFlightLevel"
							v-model="flightData.maxFlightLevel">
						</label>
					</div>
					<button class="flightData_button dotted basicButtonColors"
					id="flightData_button-enrouteALTN">ЗАПАСНЫЕ ПО МАРШРУТУ</button>
				</fieldset>
				<fieldset class="data_massData flightDataSub">
					<div class="formSorter">
						<label for="dryOperationWeight">DOW
							<input class="flightData_input" type="number" name="dryOperationWeight"
							id="dryOperationWeight"
							v-model.number="flightData.dryOperationWeight" autocomplete="off">
						</label>
					</div>
					<div class="formSorter">
						<label for="payload">PLD
							<input class="flightData_input" type="number" name="payload" id="payload" min="0"
							v-model.number="flightData.payload" autocomplete="off">
						</label>
					</div>
					<div class="formSorter">
						<label for="estZeroFuelWeight">EZFW
							<input class="flightData_input" name="estZeroFuelWeight" id="estZeroFuelWeight"
							v-model.number="flightData.estZeroFuelWeight" autocomplete="off"
							:placeholder="String(estZeroFuelWeightComputed)">
						</label>
						<label for="maxZerofuelWeight">MZFW
							<input class="flightData_input" type="number"
							name="maxZerofuelWeight" id="maxZerofuelWeight"
							v-model="flightData.maxZeroFuelWeight" disabled>
						</label>
					</div>
					<div class="formSorter">
						<label for="estTakeoffWeight">ETOW
							<input class="flightData_input" type="number" name="estTakeoffWeight" id="estTakeoffWeight"
							v-model="flightData.estTakeoffWeight" autocomplete="off">
						</label>
						<label for="maxTakeoffWeight">MTOW
							<input class="flightData_input" type="number" name="maxTakeoffWeight" id="maxTakeoffWeight"
							v-model="flightData.maxTakeoffWeight" disabled>
						</label>
					</div>
					<div class="formSorter">
						<label for="estLandingWeight">ELDW
							<input class="flightData_input" type="number" name="estLandingWeight" id="estLandingWeight"
							v-model="flightData.estLandingWeight" autocomplete="off">
						</label>
						<label for="maxLandingWeight">MLDW
							<input class="flightData_input" type="number" name="maxLandingWeight" id="maxLandingWeight"
							v-model="flightData.maxLandingWeight" disabled>
						</label>
					</div>
				</fieldset>
				<fieldset class="data_fuelData flightDataSub">
					<div class="formSorter">
						<label for="taxiOut">T/OUT
							<input class="flightData_input thinInput" type="number" name="taxiOut" id="taxiOut"
							v-model="flightData.taxiOut">
						</label>
						<label for="taxiIn">T/IN
							<input class="flightData_input thinInput" type="number" name="taxiIn" id="taxiIn"
							v-model="flightData.taxiIn">
						</label>

						<label for="hold">HOLD
							<input class="flightData_input thinInput" type="number" name="hold" id="hold"
							v-model="flightData.hold">
						</label>
					</div>
					<div class="formSorter">
						<label for="coningency">CONTINGENCY
							<input class="flightData_input thinInput" type="number" name="coningency"	id="coningency"
							v-model="flightData.contingency">
						</label>
					</div>
					<label for="ballast">BALLAST
						<input class="flightData_input" type="number" name="ballast" id="ballast"
						v-model="flightData.ballast">
					</label>
					<div  class="formSorter">
						<label for="mandatory">MANDATORY
							<input class="flightData_input" type="number" name="mandatory" id="mandatory"
							v-model="flightData.mandatory">
						</label>
						<label for="extra">EXTRA
							<input class="flightData_input" type="number" name="extra" id="extra"
							v-model="flightData.extra">
						</label>
					</div>
					<div class="formSorter">
						<label for="blockFuel">BLOCK
							<input class="flightData_input" type="number" name="blockFuel" id="blockFuel"
							v-model="flightData.blockFuel">
						</label>
						<label for="landingFuel">LANDING
							<input class="flightData_input" type="number" name="landingFuel" id="landingFuel"
							v-model="flightData.landingFuel">
						</label>
					</div>
					<label for="tankeringFuel">TANKERING
						<input class="flightData_input" type="checkbox" name="tankeringFuel" id="tankeringFuel"
						v-model="flightData.tankeringFuel">
					</label>
					<button class="flightData_button dotted basicButtonColors"
						id="flightData_button-remarks">РЕМАРКИ</button>
					<div class="data_fuelData_infoData">
						<label for="infoData_button-info" class="info-bookmark dotted">
							<font-awesome-icon icon="fa-solid fa-info" />
							<input type="radio" name="infoData"
							class="flightData_button infoData_button basicButtonColors"
							id="infoData_button-info">
						</label>
						<label for="infoData_button_wx" class="info-bookmark dotted">
							<font-awesome-icon icon="fa-solid fa-cloud-sun" />
							<input type="radio" name="infoData"
							class="flightData_button infoData_button basicButtonColors"
							id="infoData_button_wx">
						</label>
						<label for="infoData_button-notams" class="info-bookmark dotted">
							<font-awesome-icon icon="fa-solid fa-n" />
							<input type="radio" name="infoData"
							class="flightData_button infoData_button basicButtonColors"
							id="infoData_button-notams">
						</label>
					</div>
				</fieldset>
			</form>
			<div class="flightDataContainer_buttons">
				<button class="flightData_button mainButtons basicButtonColors" id="button-save"
				form="flightDataForm" @click.prevent="saveFlight(choosenFlightId)" >СОХРАНИТЬ</button>
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
	ref, watch, computed, reactive, watchEffect,
} from 'vue';
import schdeduleListStore from '@/stores/schdeduleListStore';
import AircraftsStore from '@/stores/AircraftsStore';
import AirlineStore from '@/stores/AirlineStore';
// import airportRequest from '@/composables/airportRequest';
import Client from '@/composables/websocket';
import greatCircleCalculator from '@/composables/greatCircleCalculator';
import { IFlight } from '@/interfaces/flight';
import { IAircraft } from '@/interfaces/aircraft';
import { IAirport } from '@/interfaces/airport';
import { inputOnlyLetters, inputLettersNumbers } from '@/composables/inputCheckers';

const airlineData = AirlineStore();
const aircraftList: IAircraft[] = AircraftsStore().aircrafts;
const flightList: IFlight[] = schdeduleListStore().list;
const choosenDeparture = reactive({}) as IAirport;
const choosenArrival = reactive({}) as IAirport;
const choosenAltn1 = reactive({}) as IAirport;
const warning = ref(false);

// eslint-disable-next-line no-undef
const props = defineProps({
	activeFlight: Object,
	activeFlightId: { type: Number, required: true },
});

// eslint-disable-next-line vue/no-setup-props-destructure
const choosenFlightId = ref(props.activeFlightId);
// eslint-disable-next-line vue/no-setup-props-destructure
const { ...choosenFlight } = props.activeFlight as IFlight;
const emptyFlightData: IFlight = reactive({
	id: 0,
	flightId: '',
	dateOfFlight: '',
	eobt: '',
	regNumber: 'выберите ВС',
	departure: '',
	arrival: '',
	altn1: '',
	speed: '',
	maxFlightLevel: 0,
	payload: 0,
	dryOperationWeight: 0,
	maxZeroFuelWeight: 0,
	maxTakeoffWeight: 0,
	maxLandingWeight: 0,
	estZeroFuelWeight: '',
	estTakeoffWeight: 0,
	estLandingWeight: 0,
	taxiOut: airlineData.taxiOut,
	taxiIn: airlineData.taxiIn,
	hold: airlineData.hold,
	contingency: airlineData.contingency,
	ballast: 0,
	mandatory: 0,
	extra: 0,
	blockFuel: 0,
	landingFuel: 0,
	tankeringFuel: false,
});

let flightData = reactive({}) as IFlight;
if (props.activeFlightId === 0) {
	flightData = emptyFlightData;
} else {
	flightData = reactive(choosenFlight);
}

const estZeroFuelWeightComputed = computed(() => flightData.dryOperationWeight + flightData.payload);

// заполняем форму либо исходными значениями, либо данными из полученной формы

// отслеживаем изменение ВС и при необходимости переписываем соответсвующие переменные
const activeAircraft = reactive({}) as IAircraft;
watch(
	() => flightData.regNumber,
	(regNumber) => {
		Object.assign(activeAircraft, aircraftList.find((plane) => plane.registration === regNumber));
		flightData.speed = activeAircraft.cruiseSpeed;
		flightData.maxFlightLevel = activeAircraft.maxFlightLevel;
		flightData.dryOperationWeight = activeAircraft.basicWeight;
		flightData.maxZeroFuelWeight = activeAircraft.maxZeroFuelWeight;
		flightData.maxLandingWeight = activeAircraft.maxLandingWeight;
		flightData.maxTakeoffWeight = activeAircraft.maxTakeoffWeight;
	},
);

watchEffect(
	() => {
		if (flightData.departure.length > 2) {
			Client.sendAirport(flightData.departure, 'departure', (el) => {
				console.log(el);
				if (el[0] === 'departure') Object.assign(choosenDeparture, el[1]);
			});
		}
	},
);

watchEffect(
	() => {
		if (flightData.arrival.length > 2) {
			Client.sendAirport(flightData.arrival, 'arrival', (el) => {
				if (el[0] === 'arrival') Object.assign(choosenArrival, el[1]);
			});
		}
	},
);

watchEffect(
	() => {
		if (flightData.altn1.length > 2) {
			Client.sendAirport(flightData.altn1, 'altn1', (el) => {
				if (el[0] === 'altn1') Object.assign(choosenAltn1, el[1]);
			});
		}
	},
);
// расчёт ортодромического расстояния между departure/arrival
const GreatCircleDistMain = computed(() => greatCircleCalculator(choosenDeparture, choosenArrival));
// расчёт ортодромического расстояния между departure/arrival
const GreatCircleDistAltn1 = computed(() => greatCircleCalculator(choosenArrival, choosenAltn1));

// собираем все значения input из формы  как объект и сохраняем в массив
function saveFlight(id: number) {
	if (!flightData.flightId || !flightData.dateOfFlight || !flightData.eobt
		|| !flightData.departure || !flightData.arrival) return;
	// eslint-disable-next-line prefer-object-spread
	const savedFlight = Object.assign({}, flightData);
	if (id === 0) {
		savedFlight.id = Date.now();
		flightList.push(savedFlight);
		choosenFlightId.value = savedFlight.id;
	} else {
		const element = flightList.find((el) => el.id === id) as IFlight;
		flightList.splice(flightList.indexOf(element), 1, savedFlight);
	}
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

input[type='text']{
	text-transform: uppercase;
}

.column {
	flex-direction: column;
}
#estZeroFuelWeight {
	color: rgb(240, 137, 41);
}
#estZeroFuelWeight::placeholder{
	color: rgb(14, 197, 14);
}
#estZeroFuelWeight:focus::placeholder{
	color: #fff;
}

.infoData_button {
	display: none;
}
.svg-inline--fa {
	height: 2em;
}
</style>
