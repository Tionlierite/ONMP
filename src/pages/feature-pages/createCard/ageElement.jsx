import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAge } from '../../../shared/store/actions/ageActions'
import '../../../app/styles/createCard.css'

const AgeElement = () => {
	const age = useSelector(state => state.age.initialAge)
	const dispatch = useDispatch()
	console.log(age)

	const handleInputChange = event => {
		const inputValue = event.target.value
		const number = inputValue !== '' ? parseInt(inputValue) : 0
		dispatch(addAge(number))
	}

	return (
		<div className='age-element'>
			<h2>Возраст</h2>
			<input type='number' onChange={handleInputChange} />
			{/*<h3>{age}</h3>*/}
		</div>
	)
}

export default AgeElement
