// проверка на ввод только латиницы
// eslint-disable-next-line import/prefer-default-export
export function inputOnlyLetters(event: KeyboardEvent) {
	if (event.key !== 'Backspace' && event.key !== 'Delete') {
		console.log(/^[A-z]$/.test(event.key));
		if (!/^[A-z]$/.test(event.key)) event.preventDefault();
	}
}

export function inputLettersNumbers(event: KeyboardEvent) {
	if (event.key !== 'Backspace' && event.key !== 'Delete') {
		console.log(/^[A-z]$/.test(event.key));
		if (!/^[A-z0-9]$/.test(event.key)) event.preventDefault();
	}
}
