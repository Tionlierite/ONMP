import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

const SecondAssistanceProvided = () => {
	const secondAssistance = useSelector(
		state => state.algorithms.algorithmResult
	)
	return (
		<div className='second-assistance'>
			<div className='second-assistance-container'>
				<h2>Оказанная помощь и ее эффект 2</h2>
				<Link to='/algorithms'>
					<Button variant='outlined'>Перейти в алгоритмы</Button>
				</Link>
			</div>
			<h3>{secondAssistance}</h3>
		</div>
	)
}

export default SecondAssistanceProvided
