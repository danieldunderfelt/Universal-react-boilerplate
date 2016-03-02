export default function ifClient(clientThing, serverThing = {}) {
	if(__CLIENT__) return clientThing
	return serverThing
}