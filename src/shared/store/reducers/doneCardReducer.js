import { ADD_DONE_CARD, DELETE_DONE_CARD } from '../../const/doneCardTypes'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	doneCardsList: []
}

export default createReducer(initialState, {
	[ADD_DONE_CARD]: function (state, action) {
		state.doneCardsList.push(action.payload)
	},
	[DELETE_DONE_CARD]: function (state, action) {
		state.doneCardsList = state.doneCardsList.filter(
			card => card.id !== action.payload
		)
	}
})
