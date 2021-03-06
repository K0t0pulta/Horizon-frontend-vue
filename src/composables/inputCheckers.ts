// проверка на ввод только латиницы
export function inputOnlyLetters(event: KeyboardEvent) {
	if (event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Tab') {
		if (!/^[A-z]$/.test(event.key)) event.preventDefault();
	}
}
// проверка на ввод только латиницы и цифр
export function inputLettersNumbers(event: KeyboardEvent) {
	if (event.key !== 'Backspace' && event.key !== 'Delete') {
		if (!/^[A-z0-9]$/.test(event.key)) event.preventDefault();
	}
}
