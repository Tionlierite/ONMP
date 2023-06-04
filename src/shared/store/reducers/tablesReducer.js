import { ADD_TABLES_RESULT } from '../../const/tablesTypes'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	tablesResult: ''
}

export default createReducer(initialState, {
	[ADD_TABLES_RESULT]: function (state, action) {
		state.tablesResult = action.payload
	}
})
