import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

const StatusLocalis = () => {
	const statusLocalis = useSelector(state => state.tables.tablesResult)
	return (
		<div className='status-localis'>
			<div className='status-localis-container'>
				<h2>Status localis</h2>
				<Link to='/tables'>
					<Button variant='outlined'>Перейти в таблицы</Button>
				</Link>
			</div>
			<h3>{statusLocalis}</h3>
		</div>
	)
}

export default StatusLocalis
