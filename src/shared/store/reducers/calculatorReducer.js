import { ADD_DRUGS } from '../../const/calculatorTypes'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	calculatorResult: ''
}

export default createReducer(initialState, {
	[ADD_DRUGS]: function (state, action) {
		state.calculatorResult = action.payload
	}
})
