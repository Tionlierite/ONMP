import { combineReducers } from '@reduxjs/toolkit'

import ageReducer from './ageReducer'
import weightReducer from './weightReducer'
import algorithmReducer from './algorithmsReducer'
import calculatorReducer from './calculatorReducer'
import tablesReducer from './tablesReducer'
import doneCardReducer from './doneCardReducer'
import undoneCardsReducer from './undoneCardsReducer'
import archiveCardReducer from './archiveCardReducer'
import templateCardReducer from './templateCardReducer'

const rootReducer = combineReducers({
	age: ageReducer,
	weight: weightReducer,
	algorithms: algorithmReducer,
	calculator: calculatorReducer,
	tables: tablesReducer,
	doneList: doneCardReducer,
	undoneList: undoneCardsReducer,
	archiveList: archiveCardReducer,
	templateList: templateCardReducer
})

export default rootReducer
