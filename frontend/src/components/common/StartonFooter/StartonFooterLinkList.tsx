/*
| Developed by Starton
| Filename : StartonFooterLinkList
| Author : Calixte DE TOURRIS (calixte@starton.io)
*/

import React from 'react'
import { Box, styled } from '@mui/material'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface StartonFooterLinkListProps {
	children: React.ReactNode
}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/
const LinkListStyled = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
}))

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const StartonFooterLinkList: React.FC<StartonFooterLinkListProps> = (props) => {
	const { children } = props

	// Render
	//--------------------------------------------------------------------------
	return <LinkListStyled>{children}</LinkListStyled>
}
