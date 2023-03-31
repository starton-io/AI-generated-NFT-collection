/*
| Developed by Starton
| Filename : StartonFooter
| Author : Calixte DE TOURRIS (calixte@starton.io)
*/

import React from 'react'
import { Box, BoxProps, styled } from '@mui/material'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface StartonFooterProps extends BoxProps {}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/
const StartonFooterStyled = styled((props: BoxProps) => <Box {...props} component="footer" />)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	width: '100vw',
	borderRadius: theme.spacing(1.25, 1.25, 0, 0),
}))

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const StartonFooter: React.FC<StartonFooterProps> = (props) => {
	const { children, ...footerProps } = props

	// Render
	//--------------------------------------------------------------------------
	return <StartonFooterStyled {...footerProps}>{children}</StartonFooterStyled>
}
