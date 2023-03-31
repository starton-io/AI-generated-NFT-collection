/*
| Developed by Starton
| Filename : seo.constants.ts
| Description : All SEO constants for Starton.
| Author : Philippe DESPLATS (philippe@starton.io)
*/

import { DefaultSeoProps } from 'next-seo/lib/types'
import StartonUtils from 'utils/starton.utils'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface DefaultSeoPropsExtra extends DefaultSeoProps {}

/*
|--------------------------------------------------------------------------
| Constants
|--------------------------------------------------------------------------
*/

// Default SEO
// ----------------------------------------------------------------------------
export const DEFAULT_SEO_PROPS: DefaultSeoPropsExtra = {
	title: 'Integrate blockchain technology',
	titleTemplate: 'Starton | %s',
	description: 'Integrate blockchain technology this week. Focus on your vision, we handle blockchain complexity',
	canonical: StartonUtils.getURL(),
	openGraph: {
		type: 'website',
		locale: 'en_US',
		site_name: 'Starton',
		description: 'Integrate blockchain technology this week. Focus on your vision, we handle blockchain complexity',
		images: [
			{
				url: `${StartonUtils.getURL()}/preview.png`,
				alt: 'Starton',
				width: 600,
				height: 600,
			},
		],
	},
	twitter: {
		handle: '@starton_io',
		site: '@starton_io',
		cardType: 'summary_large_image',
	},
	additionalLinkTags: [
		{
			rel: 'shortcut icon',
			href: '/favicon.ico',
		},
	],
	additionalMetaTags: [
		// App data for internal project
		{
			property: 'starton:app-name',
			content: 'Starton',
		},
		{
			property: 'starton:app-version',
			content: process.env.appVersion || '1.0.0',
		},
		// Other meta
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE=edge; chrome=1',
		},
	],
}
