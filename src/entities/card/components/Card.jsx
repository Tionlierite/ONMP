import React from 'react'

export function Card({ name, description, createDate }) {
	return (
		<div style={{ display: 'inline' }}>
			<li>{name + description + createDate}</li>
		</div>
	)
}
