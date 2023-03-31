/*
| Developed by Starton
| Filename : AppLayoutFooter.tsx
| Author : Philippe DESPLATS (philippe@starton.io)
*/

import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Container, ContainerProps, Grid, styled, Typography } from '@mui/material'
import { StartonButton } from '@starton/ui-nextjs'
import Link from 'next/link'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface AppLayoutFooterProps {}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/
const Footer = styled((props) => <Container component={'footer'} {...props} />)<ContainerProps>(({ theme }) => ({
	padding: theme.spacing(2, 0),
	height: 75,
}))

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const AppLayoutFooter: React.FC<AppLayoutFooterProps> = () => {
	const { t } = useTranslation()
	const links = React.useMemo(() => {
		return [
			{
				sentence: `${t('common:footer.join-us')}`,
				name: 'discord',
				href: 'https://discord.starton.io',
			},
			{
				sentence: `${t('common:footer.discover')}`,
				name: `${t('common:footer.website')}`,
				href: 'https://starton.io',
			},
			{
				sentence: `${t('common:footer.start-building')}`,
				name: 'web3',
				href: 'https://starton.io',
			},
		]
	}, [t])

	return (
		<Footer>
			<Grid container gap={3}>
				{links.map((link, index) => (
					<Grid item xs key={index} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={1}>
						<Typography variant={'button'}>{link.sentence}</Typography>
						<Link href={link.href} target={'_blank'} rel="noreferrer" passHref>
							<StartonButton variant={'contained'}>{link.name}</StartonButton>
						</Link>
					</Grid>
				))}
			</Grid>
		</Footer>
	)
}

/*
|--------------------------------------------------------------------------
| Component configurations
|--------------------------------------------------------------------------
*/
AppLayoutFooter.displayName = 'AppLayoutFooter'
