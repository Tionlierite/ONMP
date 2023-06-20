import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteUndoneCard } from '../../../shared/store/actions/undoneCardActions'
import { deleteDoneCard } from '../../../shared/store/actions/doneCardActions'
import { deleteArchiveCard } from '../../../shared/store/actions/archiveCardActions'
import { deleteTemplateCard } from '../../../shared/store/actions/templateCardActions'

export function DeleteButton({ id, folder }) {
	const dispatch = useDispatch()

	const handleDelete = () => {
		switch (folder) {
			case 'done':
				dispatch(deleteDoneCard(id))
				break
			case 'undone':
				dispatch(deleteUndoneCard(id))
				break
			case 'archive':
				dispatch(deleteArchiveCard(id))
				break
			case 'template':
				dispatch(deleteTemplateCard(id))
				break
			default:
				break
		}
	}

	return <button onClick={handleDelete}>delete</button>
}
