/*
| Developed by Starton
| Filename : Logged.tsx
| Author : Philippe DESPLATS (philippe@starton.io)
*/

import * as React from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { Typography, CardContent } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { StartonButton } from 'components/global/StartonButton/StartonButton'
import { StartonAuthCard } from 'components/global/StartonAuthCard/StartonAuthCard'

/*
|--------------------------------------------------------------------------
| Logged component who display user connect informations. More informations
| about logged wallet here : https://wagmi.sh/docs/getting-started
|--------------------------------------------------------------------------
*/

export default function Logged() {
	const { t } = useTranslation()
	const { address } = useAccount()
	const { disconnect } = useDisconnect()

	return (
		<StartonAuthCard>
			<CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
				<Typography variant="body2" sx={{ fontWeight: 'bold' }}>
					{t('index:content.connected')}
				</Typography>
				<Typography variant={'body2'} color={'secondary'}>
					{address}
				</Typography>
				<StartonButton variant="outlined" color="error" onClick={() => disconnect()} size={'large'}>
					{t('index:content.disconnect')}
				</StartonButton>
			</CardContent>
		</StartonAuthCard>
	)
}
