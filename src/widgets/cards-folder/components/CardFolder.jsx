import React from 'react'
import { Folder } from '../../../entities/folder'
import { useSelector } from 'react-redux'
import { Card } from '../../../entities/card'
import { PrintButton } from '../../../features/print-button'
import { EditButton } from '../../../features/edit-button'
import { DeleteButton } from '../../../features/delete-button'

export function CardFolder() {
	const stateOfDoneCards = useSelector(state => state.doneList.doneCardsList)
	const stateOfUndoneCards = useSelector(
		state => state.undoneList.undoneCardsList
	)
	const stateOfArchiveCards = useSelector(
		state => state.archiveList.archiveCardsList
	)
	const stateOfTemplateCards = useSelector(
		state => state.templateList.templateCardsList
	)
	return (
		<>
			<Folder name='Готовые' />
			{/*Feature cards count*/}
			{stateOfDoneCards.map(item => (
				<div className={`done-card-${item.id}`} key={item.id}>
					<Card
						key={item.id}
						name={item.cardName}
						description={item.cardDescription}
						createDate={item.creationDate}
					/>
					<PrintButton id={item.id} folder={item.folder} />
					<EditButton id={item.id} folder={item.folder} />
					<DeleteButton id={item.id} folder={item.folder} />
				</div>
			))}
			<Folder name='Незавершенные' />
			{/*Feature cards count*/}
			{stateOfUndoneCards.map(item => (
				<div className={`undone-card-${item.id}`} key={item.id}>
					<Card
						key={item.id}
						name={item.cardName}
						description={item.cardDescription}
						createDate={item.creationDate}
					/>
					<PrintButton id={item.id} folder={item.folder} />
					<EditButton id={item.id} folder={item.folder} />
					<DeleteButton id={item.id} folder={item.folder} />
				</div>
			))}
			<Folder name='Архив' />
			{/*Feature cards count*/}
			{stateOfArchiveCards.map(item => (
				<div className={`archive-card-${item.id}`} key={item.id}>
					<Card
						key={item.id}
						name={item.cardName}
						description={item.cardDescription}
						createDate={item.creationDate}
					/>
					<PrintButton id={item.id} folder={item.folder} />
					<EditButton id={item.id} folder={item.folder} />
					<DeleteButton id={item.id} folder={item.folder} />
				</div>
			))}
			<Folder name='Шаблоны' />
			{/*Feature cards count*/}
			{stateOfTemplateCards.map(item => (
				<div className={`template-card-${item.id}`} key={item.id}>
					<Card
						key={item.id}
						name={item.cardName}
						description={item.cardDescription}
						createDate={item.creationDate}
					/>
					<PrintButton id={item.id} folder={item.folder} />
					<EditButton id={item.id} folder={item.folder} />
					<DeleteButton id={item.id} folder={item.folder} />
				</div>
			))}
		</>
	)
}
