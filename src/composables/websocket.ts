// export default new WebSocket('ws://127.0.0.1:8082');

class ApiClient {
	socket!: WebSocket;

	status: string | undefined;

	init(callback: (arg0: string) => void) {
		this.socket = new WebSocket('ws://127.0.0.1:8082');
		this.socket.onopen = () => { callback('Online'); };
		this.socket.onclose = () => { callback('Offline'); };
		this.socket.onerror = (event) => { callback(`Some error: ${event.type}`); };
	}

	sendAirport(request: string) {
		if (request.length < 3) return;
		const requestUpper = request.toUpperCase();
		const searchRequest = {
			type: 'search',
			data: requestUpper,
		};
		this.socket.send(JSON.stringify(searchRequest));
	}

	response(callback: (arg0: any) => void) {
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
