import { createAction } from '@reduxjs/toolkit'
import { ADD_DONE_CARD, DELETE_DONE_CARD } from '../../const/doneCardTypes'

export const addDoneCard = createAction(ADD_DONE_CARD)
export const deleteDoneCard = createAction(DELETE_DONE_CARD)
