/*
| Developed by Starton
| Filename : StartonButton.tsx
| Author : Calixte De Tourris (calixte@starton.com)
*/

import React, { CSSProperties } from 'react'
import { Button, ButtonProps, styled, TypographyVariants } from '@mui/material'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface StartonButtonProps extends ButtonProps {
	noUpperCase?: boolean
	fontSize?: keyof TypographyVariants
}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/
const ButtonStyled = styled(Button, {
	shouldForwardProp: (propName) => propName !== 'noUpperCase' && propName !== 'fontSize',
})<StartonButtonProps>(({ theme, size, color, variant, noUpperCase, fontSize }) => {
	const activeColor = theme.palette[color !== 'inherit' && typeof color !== 'undefined' ? color : 'primary']

	return {
		/** Base style **/
		borderRadius: '2px',
		whiteSpace: 'nowrap',
		width: 'fit-content',

		...(size === 'small' ? theme.typography.button2 : theme.typography.button1),

		/** Overriding size with font size **/
		...(fontSize && (theme.typography[fontSize] as CSSProperties)),

		/** Upper case override **/
		...(noUpperCase && { textTransform: 'none' }),

		/** Sizes **/
		...(size === 'large' && { padding: theme.spacing(1.5, 2.5) }),
		...(size === 'medium' && { padding: theme.spacing(1, 2) }),
		...(size === 'small' && { padding: theme.spacing(1, 1.5) }),

		/** Variants **/
		...(variant === 'outlined' && {
			border: '1px solid',
			borderColor: theme.palette.divider,
		}),

		/** Icons **/
		'& .MuiButton-iconSizeSmall, & .MuiButton-iconSizeSmall > svg': {
			width: theme.spacing(1.5),
			height: theme.spacing(1.5),
		},

		'& .MuiButton-iconSizeMedium, & .MuiButton-iconSizeMedium > svg, \
			& .MuiButton-iconSizeLarge, & .MuiButton-iconSizeLarge > svg': {
			width: theme.spacing(1.75),
			height: theme.spacing(1.75),
		},

		'& .MuiButton-startIcon': {
			marginRight: theme.spacing(1.5),
			marginLeft: 0,
		},
		'& .MuiButton-endIcon': {
			marginLeft: theme.spacing(1.5),
			marginRight: 0,
		},

		outlineColor: 'transparent',
		transition:
			'outline-color 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

		/** Responsiveness **/
		[theme.breakpoints.up('md')]: {
			...((size === 'large' || size === 'medium') && { borderRadius: '8px' }),
			...(size === 'small' && { borderRadius: '4px' }),

			/** Sizes **/
			...(size === 'large' && { padding: theme.spacing(2, 4.75) }),
			...(size === 'medium' && { padding: theme.spacing(1.5, 4) }),
			...(size === 'small' && { padding: theme.spacing(1.5, 3) }),

			/** Icons **/
			'& .MuiButton-iconSizeSmall, & .MuiButton-iconSizeSmall > svg': {
				width: theme.spacing(2.5),
				height: theme.spacing(2.5),
			},

			'& .MuiButton-iconSizeMedium, & .MuiButton-iconSizeMedium > svg, \
				& .MuiButton-iconSizeLarge, & .MuiButton-iconSizeLarge > svg': {
				width: theme.spacing(2.75),
				height: theme.spacing(2.75),
			},
			'& .MuiButton-startIcon': {
				marginRight: theme.spacing(1.75),
				marginLeft: 0,
			},
			'& .MuiButton-endIcon': {
				marginLeft: theme.spacing(1.75),
				marginRight: 0,
			},
		},
		/** Hover state **/
		'&:hover': {
			...((variant === 'text' || typeof variant === 'undefined') && {
				backgroundColor: theme.palette.action.hover,
				color: activeColor.dark,
			}),
			...(variant === 'outlined' && {
				borderColor: theme.palette.divider,
				outlineWidth: 1,
				outlineColor: theme.palette.divider,
				outlineStyle: 'solid',
				backgroundColor: 'transparent',
				color: activeColor.dark,
			}),
		},

		/** Active state **/
		'&:active': {
			...((variant === 'text' || typeof variant === 'undefined') && {
				backgroundColor: theme.palette.action.focus,
				color: activeColor.dark,
			}),
			...(variant === 'outlined' && {
				backgroundColor: 'transparent',
			}),
			...(variant === 'contained' && {
				outlineWidth: 1,
				outlineColor: theme.palette.divider,
				outlineStyle: 'solid',
			}),
		},

		/** Disabled state **/
		'&.Mui-disabled': {
			color: theme.palette.text.disabledButton,
			...(variant === 'outlined' && {
				border: 0,
			}),
			...(variant === 'contained' && {
				backgroundColor: theme.palette.background.disabledButton,
			}),
		},
	}
})

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const StartonButton: React.FC<StartonButtonProps> = (props) => {
	const { children, ...buttonProps } = props

	// Render
	//--------------------------------------------------------------------------
	return <ButtonStyled {...buttonProps}>{children}</ButtonStyled>
}

StartonButton.defaultProps = {
	size: 'medium',
}
