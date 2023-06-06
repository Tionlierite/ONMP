import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

const FirstAssistanceProvided = () => {
	const firstAssistance = useSelector(
		state => state.calculator.calculatorResult
	)
	return (
		<div className='first-assistance'>
			<div className='first-assistance-container'>
				<h2>Оказанная помощь и ее эффект 1</h2>
				<Link to='/calculator'>
					<Button variant='outlined'>Перейти в калькулятор</Button>
				</Link>
			</div>
			<h3>{firstAssistance}</h3>
		</div>
	)
}

export default FirstAssistanceProvided
