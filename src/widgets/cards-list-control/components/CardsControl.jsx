import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux'
import { addUndoneCard } from '../../../shared/store/actions/undoneCardActions'
import { useHistory } from 'react-router-dom'

export function CardsControl() {
	const dispatch = useDispatch()
	const history = useHistory()

	const [modalShow, setModalShow] = useState(false)
	const [values, setValues] = useState({
		cardName: '',
		cardDescription: '',
		submitDisabled: true
	})

	const handleShow = () => setModalShow(prevState => !prevState)
	const handleChange = e => {
		const { value, name } = e.target

		value.trim()
			? (values.submitDisabled = false)
			: (values.submitDisabled = true)

		setValues(prevState => ({
			...prevState,
			[name]: value
		}))
	}
	const handleCreate = () => {
		let randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
		randomNumber += values.cardName.length

		const today = new Date()
		const year = today.getFullYear()
		let month = today.getMonth() + 1
		let day = today.getDate()

		if (day < 10) day = '0' + day
		if (month < 10) month = '0' + month

		const fullDate = day + '.' + month + '.' + year

		const newUndoneCard = {
			id: randomNumber,
			cardName: values.cardName,
			cardDescription: values.cardDescription,
			creationDate: fullDate,
			folder: 'undone',
			payload: {
				zhalobiAndAnamnez: {
					zhalobi: '',
					anamnez: ''
				},
				objectivno: {
					obshee: '',
					sozn: '',
					polozh: '',
					kozhn: '',
					sip: '',
					zev: '',
					mindal: '',
					limf: '',
					prolezh: '',
					oteki: '',
					temp: ''
				},
				dihanie: {
					cdd: '',
					odishk: '',
					patolog: '',
					auskalt: '',
					hrip: '',
					perkut: '',
					kashel: '',
					mokrot: ''
				},
				krovoobrsh: {
					puls: '',
					napolnen: '',
					css: '',
					davlen: '',
					toni: '',
					shum: '',
					provodits: '',
					perikard: '',
					accent: ''
				},
				pishevaren: {
					yazik: '',
					oblozhen: '',
					zhivotforma: '',
					zhivot: '',
					simpt: '',
					peristalt: '',
					pechen: '',
					selezenk: '',
					rvota: '',
					stul: ''
				},
				nervnaya: {
					poved: '',
					contact: '',
					chuvstvit: '',
					rech: '',
					zrachkiODOS: '',
					zrachkiForm: '',
					fotoreact: '',
					nistagm: '',
					assym: '',
					mening: '',
					ochag: '',
					coordin: '',
					mochepolov: '',
					pokolach: ''
				},
				localis: {
					ves: '',
					vozrast: '',
					custom: ''
				},
				instrument: {
					custom: ''
				},
				okazannayaAndRecomend: {
					okazannaya: '',
					recomend: ''
				},
				other: {
					rash: '',
					sign: '',
					activ: '',
					data: ''
				}
			}
		}

		dispatch(addUndoneCard(newUndoneCard))
		setValues({
			cardName: '',
			cardDescription: '',
			submitDisabled: true
		})
		setModalShow(prevState => !prevState)

		history.push(`/card-create/${randomNumber}/undone`)
	}

	const { cardName, cardDescription, submitDisabled } = values

	return (
		<>
			<div style={{ display: 'inline' }}>Карты</div>
			<button onClick={handleShow}>Создать карту</button>
			<button>Отображение</button>

			<Modal show={modalShow} onHide={handleShow}>
				<Modal.Header closeButton>
					<Modal.Title>Создать карту</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Название карты</Form.Label>
							<Form.Control
								type='text'
								value={cardName}
								name='cardName'
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'
						>
							<Form.Label>Описание карты</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								value={cardDescription}
								name='cardDescription'
								onChange={handleChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleShow}>
						Закрыть
					</Button>
					<Button
						variant='primary'
						onClick={handleCreate}
						disabled={submitDisabled}
					>
						Создать
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
