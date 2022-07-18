export interface IFlight {
	id: number,
	flightId: string,
	dateOfFlight: string,
	eobt: string,
	regNumber: string,
	departure: string,
	arrival: string,
	altn1: string,
	altnList: string[]
	speed: string,
	maxFlightLevel: number,
	payload: number,
	dryOperationWeight: number,
	maxZeroFuelWeight: number,
	maxTakeoffWeight: number,
	maxLandingWeight: number,
	estZeroFuelWeight: number | string,
	estTakeoffWeight: number,
	estLandingWeight: number,
	taxiOut: number,
	taxiIn: number,
	hold: number,
	contingency: number,
	ballast: number,
	mandatory: number,
	extra: number,
	blockFuel: number,
	landingFuel: number,
	tankeringFuel: boolean,
}

// const emptyFlightData = reactive({
// 	id: 0,
// 	flightId: '',
// 	dateOfFlight: '',
// 	eobt: '',
// 	regNumber: 'выберите ВС',
// 	departure: '',
// 	arrival: '',
// 	altn1: '',
// 	speed: '',
// 	maxFlightLevel: '',
// 	payload: 0,
// 	dryOperationWeight: 0,
// 	maxZeroFuelWeight: Number,
// 	maxTakeoffWeight: Number,
// 	maxLandingWeight: Number,
// 	estZeroFuelWeight: '',
// 	estTakeoffWeight: Number,
// 	estLandingWeight: Number,
// 	taxiOut: airlineData.taxiOut,
// 	taxiIn: airlineData.taxiIn,
// 	hold: airlineData.hold,
// 	contingency: airlineData.contingency,
// 	ballast: 0,
// 	mandatory: 0,
// 	extra: 0,
// 	blockFuel: 0,
// 	landingFuel: 0,
// 	tankeringFuel: false,
// }) as IFlight;
