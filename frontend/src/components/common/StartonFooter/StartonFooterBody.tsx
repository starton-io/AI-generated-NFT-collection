/*
| Developed by Starton
| Filename : StartonFooterBody
| Author : Calixte DE TOURRIS (calixte@starton.com)
*/

import React from 'react'
import { Box, styled } from '@mui/material'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface StartonFooterBodyProps {
	children: React.ReactNode
}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/

const FooterBodyStyled = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2, 3, 5),
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(3),
	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
		padding: theme.spacing(4, 9, 10),
	},
}))

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const StartonFooterBody: React.FC<StartonFooterBodyProps> = (props) => {
	const { children } = props

	// Render
	//--------------------------------------------------------------------------
	return <FooterBodyStyled>{children}</FooterBodyStyled>
}
