import {
	ADD_TEMPLATE_CARD,
	DELETE_TEMPLATE_CARD
} from '../../const/templateCardTypes'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	templateCardsList: []
}

export default createReducer(initialState, {
	[ADD_TEMPLATE_CARD]: function (state, action) {
		state.templateCardsList.push(action.payload)
	},
	[DELETE_TEMPLATE_CARD]: function (state, action) {
		state.templateCardsList = state.templateCardsList.filter(
			card => card.id !== action.payload
		)
	}
})
