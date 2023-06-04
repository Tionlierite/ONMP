import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWeight } from '../../../shared/store/actions/weightActions'

const WeightElement = () => {
	const weight = useSelector(state => state.weight.initialWeight)
	const dispatch = useDispatch()

	const handleInputChange = event => {
		const inputValue = event.target.value
		const number = inputValue !== '' ? parseInt(inputValue) : 0
		dispatch(addWeight(number))
	}
	return (
		<>
			<h2>Вес</h2>
			<input type='number' onChange={handleInputChange} />
			<h3>{weight}</h3>
		</>
	)
}

export default WeightElement
