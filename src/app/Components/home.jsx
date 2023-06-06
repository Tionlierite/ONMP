import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import '../styles/home.css'

const Home = () => {
	const [modal, setModal] = useState(false)
	const [cardName, setCardName] = useState('')
	const [description, setDescription] = useState('')

	const setModalStyle = () => {
		return modal ? { display: 'block' } : { display: 'none' }
	}

	const handleModalButtonClick = () => {
		setModal(prevState => !prevState)
	}

	const handleChange = e => {
		const { name, value } = e.target

		if (name === 'cardName') setCardName(value)
		else setDescription(value)
	}

	const handleCreateClick = () => {
		const cardList = document.querySelector('.done-cards-list')
		const card = document.createElement('div')
		const date = new Date()

		const now =
			date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()

		card.innerHTML = `
		<div class="card" id="${cardName + description}" style="display: flex">
			<p style="font-weight: bold">${cardName}</p>
			<p style="margin-left: 10px">${description}</p>
			<p style="margin-left: 250px">${now}</p>
		</div>
		`
		cardList.appendChild(card)
		document
			.querySelector('.edit-button')
			.setAttribute('style', 'display: flex;')
		setModal(false)
		setCardName('')
		setDescription('')
	}

	return (
		<>
			<div
				className='header'
				style={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<h1 className='cards'>Карты</h1>
				<Button
					variant='contained'
					style={{ alignSelf: 'flex-end', marginRight: '250px' }}
					onClick={handleModalButtonClick}
					disabled={true}
				>
					Создать карту
				</Button>
			</div>
			<div className='cards-folders-container'>
				<div className='done-cards-container'>
					<h3 className='ready'>Готовые</h3>
					<div className='done-cards-list'>
						<div className='card' id='25212' style={{ display: 'flex' }}>
							<p style={{ fontWeight: 'bold' }}>Карта 23</p>
							<p style={{ marginLeft: '10px' }}>Бригада №285</p>
							<p style={{ marginLeft: '250px' }}>25.04.2023</p>
							<Link to='/createCard'>
								<Button variant='contained' className='edit-button'>
									Редактировать
								</Button>
							</Link>
						</div>
					</div>
				</div>
				<div className='undone-cards-container'>
					<h3>Незавершенные</h3>
					<div className='undone-cards-list'></div>
				</div>
				<div className='archive-cards-container'>
					<h3>Архив</h3>
					<div className='archive-cards-list'></div>
				</div>
				<div className='template-cards-container'>
					<h3>Шаблоны</h3>
					<div className='template-cards-list'></div>
				</div>
			</div>
			<div className='modal-window' style={setModalStyle()}>
				<h2>Название карты</h2>
				<input
					type='text'
					className='modal-input-name'
					onChange={handleChange}
					name='cardName'
					value={cardName}
				/>
				<h2>Описание карты</h2>
				<input
					type='text'
					className='modal-input-description'
					onChange={handleChange}
					name='description'
					value={description}
				/>
				<Button variant='outlined' onClick={handleCreateClick}>
					Создать
				</Button>
			</div>
		</>
	)
}

export default Home
