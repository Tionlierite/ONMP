import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const FirstAssistanceProvided = () => {
	const firstAssistance = useSelector(
		state => state.calculator.calculatorResult
	)
	return (
		<>
			<h2>Оказанная помощь и ее эффект 1</h2>
			<Link to='/calculator'>
				<button>Перейти в калькулятор</button>
			</Link>
			<h3>{firstAssistance}</h3>
		</>
	)
}

export default FirstAssistanceProvided
