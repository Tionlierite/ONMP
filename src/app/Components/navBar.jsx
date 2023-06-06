import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navBar.css'

const NavBar = () => {
	return (
		<div className='navigation-bar'>
			<div className='navigation-bar-logo'>
				<Link to='/'>
					<img src={require('../styles/logo.png')} alt='logo' />
				</Link>
			</div>
			<ul className='navigation-bar-models-items'>
				<li>
					<Link to='/algorithms' className='algorithm-label'>
						Алгоритмы
					</Link>
				</li>
				<li>
					<Link to='/dictionary' className='dictionary-label'>
						Справочник
					</Link>
				</li>
				<li>
					<Link to='/calculator' className='calculator-label'>
						Калькулятор
					</Link>
				</li>
				<li>
					<Link to='/tables' className='tables-label'>
						Таблицы
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default NavBar
