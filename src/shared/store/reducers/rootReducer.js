import { combineReducers } from '@reduxjs/toolkit'

import ageReducer from './ageReducer'
import weightReducer from './weightReducer'
import algorithmReducer from './algorithmsReducer'
import calculatorReducer from './calculatorReducer'
import tablesReducer from './tablesReducer'

const rootReducer = combineReducers({
	age: ageReducer,
	weight: weightReducer,
	algorithms: algorithmReducer,
	calculator: calculatorReducer,
	tables: tablesReducer
})

export default rootReducer
