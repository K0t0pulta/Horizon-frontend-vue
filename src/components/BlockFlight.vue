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
		<div class="flightDataContainer_data">
			<form action="" method="post" id="flightDataForm" name="flightDataForm">
				<fieldset class="data_routeData flightDataSub">
					<span class="warning" v-if="warning">
						<img src="/img/triangle-exclamation-solid.svg" alt="there is empty field" srcset="">
					</span>
					<label for="flightID">FLIGHT {{airlineData.code}}
						<input class="flightData_input" type="text" name="flightId" id="flightId"
						maxlength="4" v-model="flightData.flightId" :class="{empty: !flightData.flightId}">
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
					<label for="regNumber">REG
						<select id="regNumber" name="regNumber" class="flightData_input"
						v-model="flightData.regNumber" required
						:class="{empty: flightData.regNumber === 'выберите ВС'}">
							<option value="выберите ВС" disabled selected hidden>выберите ВС</option>
							<option v-for="aircraft in aircraftList" :value="aircraft.registration"
							:key="aircraft.msn">{{ aircraft.registration }}</option>
						</select>
					</label>
					<div class="formSorter column">
						<div>

							<label for="departure">DEP
								<input class="flightData_input" type="text" name="departure" autocomplete="off"
								id="departure" v-model="flightData.departure" required autocapitalize="character"
								:class="{empty: !flightData.departure}">
								{{choosenDeparture.name}}
							</label>
						</div>
						<div>
							<label for="arrival">ARR
								<input class="flightData_input" type="text" name="arrival" autocomplete="off"
								id="arrival" v-model="flightData.arrival" required
								:class="{empty: !flightData.arrival}">
								{{choosenArrival.name}}
							</label>
						</div>
						<div>
							<span v-show="GreatCircleDistMain > 0">
							Ортодромическое расстояние: {{GreatCircleDistMain}} км</span>
						</div>
					</div>
				</fieldset>
				<fieldset class="data_otherData flightDataSub">
					<button @click.prevent="">Добавить запасной аэродром</button>
					<div class="formSorter">
						<label for="altn1">ALTN 1
							<input class="flightData_input" type="text" name="altn1" id="altn1"
							autocomplete="off" v-model="flightData.altn1">{{choosenAltn1.name}}
						</label>
						<span v-show="GreatCircleDistAltn1 > 0">
						Ортодромическое расстояние: {{GreatCircleDistAltn1}} км</span>
					</div>
					<label for="speed">SPEED
						<input class="flightData_input" type="text" name="speed" id="speed"
						v-model="flightData.speed">
					</label>
					<label for="maxFlightLevel">MAX FL
						<input class="flightData_input" type="text" name="maxFlightLevel" id="maxFlightLevel"
						v-model="flightData.maxFlightLevel">
					</label>
					<button class="flightData_button dotted basicButtonColors"
					id="flightData_button-enrouteALTN">ЗАПАСНЫЕ ПО МАРШРУТУ</button>
				</fieldset>
				<fieldset class="data_massData flightDataSub">
					<label for="dryOperationWeight">DOW
						<input class="flightData_input" type="number" name="dryOperationWeight" id="dryOperationWeight"
						v-model.number="flightData.dryOperationWeight" autocomplete="off">
					</label>
					<label for="payload">PLD
						<input class="flightData_input" type="number" name="payload" id="payload" min="0"
						v-model.number="flightData.payload" autocomplete="off">
					</label>
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
						<label for="taxiOut">TAXI OUT
							<input class="flightData_input" type="number" name="taxiOut" id="taxiOut"
							v-model="flightData.taxiOut">
						</label>
						<label for="taxiIn">TAXI IN
							<input class="flightData_input" type="number" name="taxiIn" id="taxiIn"
							v-model="flightData.taxiIn">
						</label>

					</div>
					<div class="formSorter">
						<label for="hold">HOLD
							<input class="flightData_input" type="number" name="hold" id="hold"
							v-model="flightData.hold">
						</label>
						<label for="coningency">CONTINGENCY
							<input class="flightData_input" type="number" name="coningency"	id="coningency"
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
						<label for="blockFuel">BLOCK FUEL
							<input class="flightData_input" type="number" name="blockFuel" id="blockFuel"
							v-model="flightData.blockFuel">
						</label>
						<label for="landingFuel">LANDING FUEL
							<input class="flightData_input" type="number" name="landingFuel" id="landingFuel"
							v-model="flightData.landingFuel">
						</label>
					</div>
					<label for="tankeringFuel">TANKERING FUEL
						<input class="flightData_input" type="checkbox" name="tankeringFuel" id="tankeringFuel"
						v-model="flightData.tankeringFuel">
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
				form="flightDataForm" type="button" @click="saveFlight(choosenFlightId)" >СОХРАНИТЬ</button>
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
	ref, watch, computed, toRef, reactive, watchEffect,
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

const choosenFlightId = toRef(props, 'activeFlightId');
// eslint-disable-next-line vue/no-setup-props-destructure
const { ...choosenFlight } = props.activeFlight as IFlight;
const emptyFlightData = reactive({
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
}) as unknown as IFlight;

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
	// eslint-disable-next-line prefer-object-spread
	const savedFlight = Object.assign({}, flightData);
	if (id === 0) {
		savedFlight.id = Date.now();
		flightList.push(savedFlight);
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

.formSorter {
	margin: 3px 0;
	display: flex;
	justify-content: space-around;
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
</style>
