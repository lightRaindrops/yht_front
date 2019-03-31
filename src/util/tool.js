const myStorage = localStorage;
const getter = (name) => {
	return myStorage.getItem(name);
}
const setter = (name, value) => {
	return myStorage.setItem(name, value);
}


export default {
	getter,
	setter
}