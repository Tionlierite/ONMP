import {
	ADD_UNDONE_CARD,
	DELETE_UNDONE_CARD,
	RETURN_UNDONE_CARD
} from '../../const/undoneCardTypes'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	undoneCardsList: []
}

export default createReducer(initialState, {
	[ADD_UNDONE_CARD]: function (state, action) {
		state.undoneCardsList.push(action.payload)
	},
	[DELETE_UNDONE_CARD]: function (state, action) {
		state.undoneCardsList = state.undoneCardsList.filter(
			card => card.id !== action.payload
		)
	},
	[RETURN_UNDONE_CARD]: function (state, action) {
		return state.undoneCardsList.find(card => card.id === action.payload)
	}
})
