/*
| Developed by Starton
| Filename : StartonFaq
| Author : Calixte DE TOURRIS (calixte@starton.io)
*/

import React from 'react'
import { Box, Typography } from '@mui/material'
import { StartonFaqItem, StartonFaqItemProps } from './StartonFaqItem'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
interface StartonFaqItemSeoProps {
	questionName: string
	acceptedAnswerText: string
}

export interface StartonFaqProps {
	uniqueExpand?: boolean
	title: React.ReactNode
	items: Array<StartonFaqItemProps & { seo: StartonFaqItemSeoProps }>
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const StartonFaq: React.FC<StartonFaqProps> = (props) => {
	const { uniqueExpand, title, items } = props
	const [expanded, setExpanded] = React.useState<number>(-1)

	// Methods
	//--------------------------------------------------------------------------
	const handleExpand = (itemIndex: number) => {
		setExpanded((state) => (state === itemIndex ? -1 : itemIndex))
	}

	// Render
	//--------------------------------------------------------------------------
	return (
		<Box display="flex" flexDirection="column">
			<Typography variant="h2" paddingX={{ xs: 2, md: 0 }} paddingY={3}>
				{title}
			</Typography>
			{items.map((item, index) => (
				<StartonFaqItem
					key={index}
					summary={item.summary}
					details={item.details}
					onChange={() => handleExpand(index)}
					expanded={uniqueExpand ? expanded === index : undefined}
				/>
			))}
		</Box>
	)
}
