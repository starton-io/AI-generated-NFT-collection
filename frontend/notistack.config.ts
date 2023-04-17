/*
| Developed by Starton
| Filename : notistack.config.ts
| Author : Tibo Pendino (tibo@starton.io)
*/

import { AlertColor } from '@mui/material'
import { StartonSnackbarProps } from '@starton/ui-nextjs'

declare module 'notistack' {
	interface VariantOverrides {
		default: {
			color: AlertColor
		}
		info: {
			snackbarProps?: StartonSnackbarProps
		}
		success: {
			snackbarProps?: StartonSnackbarProps
		}
		warning: {
			snackbarProps?: StartonSnackbarProps
		}
		error: {
			snackbarProps?: StartonSnackbarProps
		}
	}
}
export {}
