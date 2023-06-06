import React from 'react'
import AgeElement from './ageElement'
import WeightElement from './weightElement'
import StatusLocalis from './statusLocalis'
import FirstAssistanceProvided from './firstAssistanceProv'
import SecondAssistanceProvided from './secondAssistanceProv'

const CreateCard = () => {
	return (
		<>
			<h1
				style={{
					alignSelf: 'flex-start',
					marginLeft: '600px',
					fontFamily: 'Roboto'
				}}
			>
				Редактировать карту
			</h1>
			<AgeElement />
			<WeightElement />
			<StatusLocalis />
			<FirstAssistanceProvided />
			<SecondAssistanceProvided />
		</>
	)
}

export default CreateCard
