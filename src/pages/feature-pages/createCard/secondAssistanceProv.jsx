import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SecondAssistanceProvided = () => {
	const secondAssistance = useSelector(
		state => state.algorithms.algorithmResult
	)
	return (
		<>
			<h2>Оказанная помощь и ее эффект 2</h2>
			<Link to='/algorithms'>
				<button>Перейти в алгоритмы</button>
			</Link>
			<h3>{secondAssistance}</h3>
		</>
	)
}

export default SecondAssistanceProvided
