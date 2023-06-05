import { ADD_ALGORITHM } from '../../const/algorithmsTypes'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	algorithmResult: ''
}

export default createReducer(initialState, {
	[ADD_ALGORITHM]: function (state, action) {
		state.algorithmResult = action.payload
	}
})
