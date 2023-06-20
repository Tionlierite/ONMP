import {
	ADD_ARCHIVE_CARD,
	DELETE_ARCHIVE_CARD
} from '../../const/archiveCardTypes'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	archiveCardsList: []
}

export default createReducer(initialState, {
	[ADD_ARCHIVE_CARD]: function (state, action) {
		state.archiveCardsList.push(action.payload)
	},
	[DELETE_ARCHIVE_CARD]: function (state, action) {
		state.archiveCardsList = state.archiveCardsList.filter(
			card => card.id !== action.payload
		)
	}
})
