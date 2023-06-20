import React from 'react'
import { Link } from 'react-router-dom'
import '../ui/navBar.css'

export function NavBar() {
	return (
		<div className='navigation-bar'>
			<div className='navigation-bar-logo'>
				<Link to='/card-list'>
					<img src={require('../ui/logo.png')} alt='logo' />
				</Link>
			</div>
			<ul className='navigation-bar-models-items mt-3'>
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
