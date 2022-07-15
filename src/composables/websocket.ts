// export default new WebSocket('ws://127.0.0.1:8082');

class ApiClient {
	socket!: WebSocket;

	status: string | undefined;

	init(callback: (arg0: string) => void) {
		this.socket = new WebSocket('wss://127.0.0.1:8082');
		this.socket.onopen = () => { callback('Online'); };
		this.socket.onclose = () => { callback('Offline'); };
		this.socket.onerror = (event) => { callback(`Some error: ${event.type}`); };
	}

	requestAircraftsList(callback: (arg0: unknown[]) => void) {
		const request = {
			type: 'requestAircrafts',
		};
		this.socket.send(JSON.stringify(request));
		this.socket.onmessage = (message) => {
			const response = JSON.parse(message.data);
			if (response.length > 0) {
				const result = response;
				console.log(result);
				callback(result);
			}
		};
	}

	sendAirport(airportCode: string, airportType: string, callback: (arg0: unknown[]) => void) {
		if (airportCode.length < 3) return;
		const requestUpper = airportCode.toUpperCase();
		const searchRequest = {
			type: 'search',
			data: requestUpper,
		};
		this.socket.send(JSON.stringify(searchRequest));
		this.socket.onmessage = (message) => {
			const response = JSON.parse(message.data);
			if (response.length > 0) {
				const airport = { ...response[0] };
				const result = [`${airportType}`, airport];
				console.log(result);
				callback(result);
			}
		};
	}

	sendAircraft(msn: string, callback: (arg0: string | number) => void) {
		const searchRequest = {
			type: 'search',
			data: msn,
		};
		this.socket.send(JSON.stringify(searchRequest));
		this.socket.onmessage = (message) => {
			const response = JSON.parse(message.data);
			if (response.length > 0) {
				const result = { ...response[0] };
				callback(result);
			}
		};
	}
}

let instance = null;
export default instance || (instance = new ApiClient());
