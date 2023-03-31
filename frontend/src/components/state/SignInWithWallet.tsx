/*
| Developed by Starton
| Filename : SignInWithWallet.tsx
| Author : Philippe DESPLATS (philippe@starton.io)
*/

import * as React from 'react'
import { CardContent, Typography, Box } from '@mui/material'
import { useConnect } from 'wagmi'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { StartonButton } from 'components/global/StartonButton/StartonButton'
import { StartonAuthCard } from 'components/global/StartonAuthCard/StartonAuthCard'

/*
|--------------------------------------------------------------------------
| SignIn with Metamask, Coinbase Wallet or WalletConnect using Wagmi connectors
|--------------------------------------------------------------------------
*/
export default function SignInWithWallet() {
	const { connect, connectors, error } = useConnect()
	const { t } = useTranslation()

	return (
		<StartonAuthCard>
			<CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
				<Box>
					<Typography variant="h2" color={'secondary'}>
						{t('index:content.sign-in-with')}
					</Typography>
				</Box>
				<Box>
					{connectors.map((connector) => (
						<StartonButton variant={'contained'} key={connector.id} onClick={() => connect({ connector })}>
							<Image
								alt={connector.name}
								src={`/${connector.name.replace(/\s/g, '')}.svg`}
								width={175}
								height={75}
							/>
						</StartonButton>
					))}
				</Box>
				{error ? (
					<Box>
						<Typography variant="body2" color={'error'}>
							{error.message}
						</Typography>
					</Box>
				) : null}
			</CardContent>
		</StartonAuthCard>
	)
}
