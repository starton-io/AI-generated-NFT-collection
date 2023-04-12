import React from 'react'
import Link from 'next/link'
import { StartonLogo } from '@starton/ui-nextjs'
import { StartonFooter, StartonFooterHead } from './common/StartonFooter'
import { DiscordRounded } from './common/svg/DiscordRounded'
import { TwitterRounded } from './common/svg/TwitterRounded'
import { LinkedInRounded } from './common/svg/LinkedInRounded'
import { StartonButton } from './common/StartonButton'

/*
|--------------------------------------------------------------------------
| Constants
|--------------------------------------------------------------------------
*/
const footerButtons = [
	{
		href: 'https://starton.io/',
		target: '_blank',
		icon: <StartonLogo fill="#000" />,
		label: 'Starton',
	},
	{
		href: 'https://discord.starton.io/',
		target: '_blank',
		icon: <DiscordRounded />,
		label: 'Discord',
	},
	{
		href: 'https://twitter.com/starton-io/',
		target: '_blank',
		icon: <TwitterRounded />,
		label: 'Twitter',
	},
	{
		href: 'https://www.linkedin.com/company/starton-io/',
		target: '_blank',
		icon: <LinkedInRounded />,
		label: 'LinkedIn',
	},
]

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const Footer = () => {
	// Render
	//--------------------------------------------------------------------------
	return (
		<StartonFooter marginTop={{ xs: 10, md: 15 }}>
			<StartonFooterHead>
				{footerButtons.map((item, index) => (
					<Link href={item.href} target={item.target} key={index}>
						<StartonButton size="small" variant="outlined" startIcon={item.icon} color="quaternary">
							{item.label}
						</StartonButton>
					</Link>
				))}
			</StartonFooterHead>
		</StartonFooter>
	)
}
