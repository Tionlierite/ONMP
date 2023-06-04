import React from 'react'
import AgeElement from './ageElement'
import WeightElement from './weightElement'
import StatusLocalis from './statusLocalis'
import FirstAssistanceProvided from './firstAssistanceProv'
import SecondAssistanceProvided from './secondAssistanceProv'

const CreateCard = () => {
	return (
		<>
			<h1>Редактировать карту</h1>
			<AgeElement />
			<WeightElement />
			<StatusLocalis />
			<FirstAssistanceProvided />
			<SecondAssistanceProvided />
		</>
	)
}

export default CreateCard
