/*
| Developed by Starton
| Filename : StartonFaqItem
| Author : Calixte DE TOURRIS (calixte@starton.com)
*/

import React from 'react'
import {
	Accordion,
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	AccordionSummaryProps,
	styled,
} from '@mui/material'
import { KeyboardArrowRightOutlined } from '@mui/icons-material'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface StartonFaqItemProps extends Omit<AccordionProps, 'children'> {
	summary: React.ReactNode
	details: React.ReactNode
}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/
const AccordionStyled = styled(Accordion)(({ theme }) => ({
	borderTop: '1px solid',
	borderColor: theme.palette.divider,
	backgroundColor: 'transparent',
	backgroundImage: 'none',
	'&:first-of-type': {
		borderRadius: 0,
	},
	'&:last-of-type': {
		borderRadius: 0,
		borderBottom: '1px solid',
		borderColor: theme.palette.divider,
	},
}))

const AccordionSummaryStyled = styled((props: AccordionSummaryProps) => (
	<AccordionSummary expandIcon={<KeyboardArrowRightOutlined />} {...props} />
))(({ theme }) => ({
	...theme.typography.h3,
	margin: 0,
	padding: theme.spacing(3, 2.5),
	gap: theme.spacing(2),
	'& .MuiAccordionSummary-content': {
		margin: 0,
	},
	'& .MuiAccordionSummary-expandIconWrapper': {
		transform: 'rotate(90deg)',
		'&, & svg': {
			width: theme.spacing(3),
			height: theme.spacing(3),
		},
	},
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(0deg)',
	},
	[theme.breakpoints.up('md')]: {
		padding: theme.spacing(4, 5),
		'& .MuiAccordionSummary-expandIconWrapper': {
			fontSize: theme.spacing(9),
			'&, & svg': {
				width: theme.spacing(9),
				height: theme.spacing(9),
			},
		},
	},
}))

const AccordionDetailsStyled = styled(AccordionDetails)(({ theme }) => ({
	...theme.typography.body1,
	whiteSpace: 'pre-line',
	padding: theme.spacing(0, 2, 3),
	maxWidth: '100ch',
	[theme.breakpoints.up('md')]: {
		padding: theme.spacing(0, 5, 4),
	},
}))

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const StartonFaqItem: React.FC<StartonFaqItemProps> = (props) => {
	const { summary, details, ...accordionProps } = props

	// Render
	//--------------------------------------------------------------------------
	return (
		<AccordionStyled disableGutters {...accordionProps}>
			<AccordionSummaryStyled>{summary}</AccordionSummaryStyled>
			<AccordionDetailsStyled>{details}</AccordionDetailsStyled>
		</AccordionStyled>
	)
}
