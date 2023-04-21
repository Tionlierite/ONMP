import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
	return (
		<ul>
			<li style={{ display: 'inline', margin: 5 }}>
				<Link to='/'>Домой</Link>
			</li>
			<li style={{ display: 'inline', margin: 5 }}>
				<Link to='/algorithms'>Алгоритмы</Link>
			</li>
			<li style={{ display: 'inline', margin: 5 }}>
				<Link to='/dictionary'>Справочник</Link>
			</li>
			<li style={{ display: 'inline', margin: 5 }}>
				<Link to='/calculator'>Калькулятор</Link>
			</li>
		</ul>
	)
}

export default NavBar
