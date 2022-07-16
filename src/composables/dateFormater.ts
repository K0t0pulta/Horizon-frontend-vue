export default function dateFormater(value: number) :string { return value > 9 ? `${value}` : `0${value}`; }
