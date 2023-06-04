import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAge } from '../../../shared/store/actions/ageActions'

const AgeElement = () => {
	const age = useSelector(state => state.age.initialAge)
	const dispatch = useDispatch()

	const handleInputChange = event => {
		const inputValue = event.target.value
		const number = inputValue !== '' ? parseInt(inputValue) : 0
		dispatch(addAge(number))
	}

	return (
		<>
			<h2>Возраст</h2>
			<input type='number' onChange={handleInputChange} />
			<h3>{age}</h3>
		</>
	)
}

export default AgeElement
