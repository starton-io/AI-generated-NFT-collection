/*
| Developed by Starton
| Filename : StartonButton.tsx
| Author : Philippe DESPLATS (philippe@starton.com)
*/

import * as React from 'react'
import { Button, ButtonProps, styled } from '@mui/material'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface StartonButtonProps extends ButtonProps {}
/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/

const StartonButtonStyled = styled(Button)(({ theme }) => ({
	fontStyle: 'normal',
	fontWeight: 700,
	fontSize: 14,
	marginTop: theme.spacing(2),
	'&.MuiButton-root.MuiButton-outlined': {
		borderRadius: 6,
	},
}))

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const StartonButton: React.FC<StartonButtonProps> = (props) => {
	return <StartonButtonStyled data-testid={'starton-button'} {...props} />
}
