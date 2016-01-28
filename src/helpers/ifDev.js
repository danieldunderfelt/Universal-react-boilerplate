export default function ifDev(devThing, elseThing = {}) {
	if(__DEVELOPMENT__) return devThing
	return elseThing
}