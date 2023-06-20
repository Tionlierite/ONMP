import { createAction } from '@reduxjs/toolkit'
import {
	ADD_ARCHIVE_CARD,
	DELETE_ARCHIVE_CARD
} from '../../const/archiveCardTypes'

export const addArchiveCard = createAction(ADD_ARCHIVE_CARD)
export const deleteArchiveCard = createAction(DELETE_ARCHIVE_CARD)
