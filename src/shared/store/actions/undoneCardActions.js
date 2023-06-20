import { createAction } from '@reduxjs/toolkit'
import {
	ADD_UNDONE_CARD,
	DELETE_UNDONE_CARD,
	RETURN_UNDONE_CARD
} from '../../const/undoneCardTypes'

export const addUndoneCard = createAction(ADD_UNDONE_CARD)
export const deleteUndoneCard = createAction(DELETE_UNDONE_CARD)
export const returnUndoneCard = createAction(RETURN_UNDONE_CARD)
