import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const StatusLocalis = () => {
	const statusLocalis = useSelector(state => state.tables.tablesResult)
	return (
		<>
			<h2>Status localis</h2>
			<Link to='/tables'>
				<button>Перейти в таблицы</button>
			</Link>
			<h3>{statusLocalis}</h3>
		</>
	)
}

export default StatusLocalis
