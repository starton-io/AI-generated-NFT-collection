/*
| Developed by Starton
| Filename : StartonNotification.tsx
| Author : Tibo Pendino (tibo@starton.com)
*/

import React from 'react'
import { StartonSnackbar, StartonSnackbarProps } from '@starton/ui-nextjs'
import { SnackbarContent, CustomContentProps, useSnackbar } from 'notistack'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface StartonNotificationProps extends CustomContentProps {
	snackbarProps: StartonSnackbarProps
}

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
*/
export const StartonNotificationSuccess = React.forwardRef<HTMLDivElement, StartonNotificationProps>((props, ref) => {
	const { id, message, snackbarProps, ...contentProps } = props
	const { closeSnackbar } = useSnackbar()

	return (
		<SnackbarContent {...contentProps} ref={ref}>
			<StartonSnackbar
				title={message as string}
				{...snackbarProps}
				color={'success'}
				sx={{ width: '400px' }}
				onClose={() => closeSnackbar(id)}
			/>
		</SnackbarContent>
	)
}) as React.ForwardRefExoticComponent<StartonNotificationProps & React.RefAttributes<Element>>

export const StartonNotificationError = React.forwardRef<HTMLDivElement, StartonNotificationProps>((props, ref) => {
	const { id, message, snackbarProps, ...contentProps } = props
	const { closeSnackbar } = useSnackbar()
	return (
		<SnackbarContent {...contentProps} ref={ref}>
			<StartonSnackbar
				title={message as string}
				{...snackbarProps}
				color={'error'}
				sx={{ width: '400px' }}
				onClose={() => closeSnackbar(id)}
			/>
		</SnackbarContent>
	)
}) as React.ForwardRefExoticComponent<StartonNotificationProps & React.RefAttributes<Element>>

export const StartonNotificationWarning = React.forwardRef<HTMLDivElement, StartonNotificationProps>((props, ref) => {
	const { id, message, snackbarProps, ...contentProps } = props
	const { closeSnackbar } = useSnackbar()
	return (
		<SnackbarContent {...contentProps} ref={ref}>
			<StartonSnackbar
				title={message as string}
				{...snackbarProps}
				color={'warning'}
				sx={{ width: '400px' }}
				onClose={() => closeSnackbar(id)}
			/>
		</SnackbarContent>
	)
}) as React.ForwardRefExoticComponent<StartonNotificationProps & React.RefAttributes<Element>>

export const StartonNotificationInfo = React.forwardRef<HTMLDivElement, StartonNotificationProps>((props, ref) => {
	const { id, message, snackbarProps, ...contentProps } = props
	const { closeSnackbar } = useSnackbar()

	return (
		<SnackbarContent {...contentProps} ref={ref}>
			<StartonSnackbar
				title={message as string}
				{...snackbarProps}
				color={'info'}
				sx={{ width: '400px' }}
				onClose={() => closeSnackbar(id)}
			/>
		</SnackbarContent>
	)
}) as React.ForwardRefExoticComponent<StartonNotificationProps & React.RefAttributes<Element>>

// @ts-ignore
StartonNotificationSuccess.displayName = 'StartonNotificationSuccess'
// @ts-ignore
StartonNotificationError.displayName = 'StartonNotificationError'
// @ts-ignore
StartonNotificationWarning.displayName = 'StartonNotificationWarning'
// @ts-ignore
StartonNotificationInfo.displayName = 'StartonNotificationInfo'
