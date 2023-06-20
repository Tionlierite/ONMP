import React from 'react'
import { useParams } from 'react-router-dom'

const CardCreate = () => {
	const { cardId, folder } = useParams()

	return (
		<>
			<h1>Card id {cardId}</h1>
		</>
	)
}

export default CardCreate
