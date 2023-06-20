import React from 'react'
import { useHistory } from 'react-router-dom'

export function EditButton({ id, folder }) {
	const history = useHistory()
	const handleClick = () => {
		history.push(`/card-create/${id}/${folder}`)
	}
	return <button onClick={handleClick}>edit</button>
}
