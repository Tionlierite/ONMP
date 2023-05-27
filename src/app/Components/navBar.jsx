import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import './navBar.css';

const NavBar = () => {
	return (
		<ul className="navbar">
			<li style={{ display: 'inline', margin: 5 }}>
				<Link to='/'><HomeIcon className="home-icon" /></Link>
			</li>
			<li style={{ display: 'inline', margin: 5 }}>
				<Link to='/algorithms'><strong>Алгоритмы</strong></Link>
			</li>
			<li style={{ display: 'inline', margin: 5 }}>
				<Link to='/dictionary'><strong>Справочник</strong></Link>
			</li>
			<li style={{ display: 'inline', margin: 5 }}>
				<Link to='/calculator'><strong>Калькулятор</strong></Link>
			</li>
			<li style={{ display: 'inline', margin: 5 }}>
				<Link to='/tables'><strong>Таблицы</strong></Link>
			</li>
		</ul>
	)
}

export default NavBar