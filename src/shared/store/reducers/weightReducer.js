import { ADD_WEIGHT } from '../../const/weightTypes'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	initialWeight: 0
}

export default createReducer(initialState, {
	[ADD_WEIGHT]: function (state, action) {
		state.initialWeight = action.payload
	}
})
