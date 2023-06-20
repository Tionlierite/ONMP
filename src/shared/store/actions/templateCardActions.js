import { createAction } from '@reduxjs/toolkit'
import {
	ADD_TEMPLATE_CARD,
	DELETE_TEMPLATE_CARD
} from '../../const/templateCardTypes'

export const addTemplateCard = createAction(ADD_TEMPLATE_CARD)
export const deleteTemplateCard = createAction(DELETE_TEMPLATE_CARD)
