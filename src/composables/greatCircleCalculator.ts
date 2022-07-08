function gcDist(a1: number, b1: number, a2: number, b2: number) : number {
	const D = Math.acos(Math.sin(a1) * Math.sin(a2) + Math.cos(a1) * Math.cos(a2) * Math.cos(b2 - b1));
	return Number((D * 6372.795).toFixed(1));
}

function latConvertor(vRaw :string) {
	const v = String(vRaw);
	const sec = Number(`${v.slice(5, 7)}.${v.slice(7)}`);
	const min = Number(v.slice(3, 5)) + sec / 60;
	const grad = Number(v.slice(1, 3)) + min / 60;
	return grad;
}

function longConvertor(vRaw :string) {
	const v = String(vRaw);
	const sec = Number(`${v.slice(6, 8)}.${v.slice(8)}`);
	const min = Number(v.slice(4, 6)) + sec / 60;
	const grad = Number(v.slice(1, 4)) + min / 60;
	return grad;
}

export default function greatCircleCalculator(obj1: any, obj2: any) {
	const { latitude: a1raw, longitude: b1raw } = obj1;
	const { latitude: a2raw, longitude: b2raw } = obj2;
	const a1 = latConvertor(a1raw);
	const b1 = longConvertor(b1raw);
	const a2 = latConvertor(a2raw);
	const b2 = longConvertor(b2raw);
	return gcDist(a1 * (Math.PI / 180), b1 * (Math.PI / 180), a2 * (Math.PI / 180), b2 * (Math.PI / 180));
}
