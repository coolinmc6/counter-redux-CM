export function countUp(count) {
	return {
		type: 'INCREMENT',
		payload: count
	}
}

export function countDown(count) {
	return {
		type: 'DECREMENT',
		payload: count
	}
}