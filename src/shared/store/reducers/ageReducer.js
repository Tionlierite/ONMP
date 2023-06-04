import { ADD_AGE } from '../../const/ageTypes'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	initialAge: 0
}

export default createReducer(initialState, {
	[ADD_AGE]: function (state, action) {
		state.initialAge = action.payload
	}
})
