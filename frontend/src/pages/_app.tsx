/*
| Developed by Starton
| Filename : _app.tsx
*/

import '../styles/globals.css'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { deepmerge } from '@mui/utils'
import { frFR, enUS, Localization } from '@mui/material/locale'
import merge from 'lodash/merge'
import { startonDarkTheme } from '@starton/ui-nextjs'
import { AppLayout } from '../components/layout/AppLayout'
import { DEFAULT_SEO_PROPS, DefaultSeoPropsExtra } from 'config/common/seo.config'
import { createEmotionCache } from 'utils/createEmotionCache'
import theme from 'styles/theme'
import { useGetCanonialUrl } from 'hooks/useGetCanonialUrl'
import { Dictionary } from 'utils'
import { AvailableLanguages } from 'contracts'
import {
	StartonNotificationError,
	StartonNotificationInfo,
	StartonNotificationSuccess,
	StartonNotificationWarning
} from "../components/common/StartonNotification";
import { SnackbarProvider } from "notistack";

/*
|--------------------------------------------------------------------------
| Client-side cache, shared for the whole session of the user in the browser.
|--------------------------------------------------------------------------
*/
const clientSideEmotionCache = createEmotionCache()

/*
|--------------------------------------------------------------------------
| Localization array for connected Material UI with Next Translate
|--------------------------------------------------------------------------
*/
const connectedLanguages: Dictionary<Localization, AvailableLanguages> = {
	en: enUS,
	fr: frFR,
}

/*
|--------------------------------------------------------------------------
| Application interface modifier
|--------------------------------------------------------------------------
*/
interface AppEmotionProps extends AppProps {
	emotionCache?: EmotionCache
}

/*
|--------------------------------------------------------------------------
| Application layout
|--------------------------------------------------------------------------
*/
export default function StartonApp({
	Component,
	pageProps,
	router,
	emotionCache = clientSideEmotionCache,
}: AppEmotionProps) {
	// Prepare canonical url
	// ----------------------------------------------------------------------------
	const { url } = useGetCanonialUrl(router)

	// Create default SEO data props
	// ----------------------------------------------------------------------------
	const defaultDataProps = React.useMemo<DefaultSeoPropsExtra>(() => {
		// Prepare data with component data
		const seoProps: DefaultSeoPropsExtra = {
			canonical: url,
			openGraph: {
				url,
			},
		}
		// Deep merging
		return merge(DEFAULT_SEO_PROPS, seoProps)
	}, [url])

	// MUI create theme with I18N changer
	// ----------------------------------------------------------------------------
	const MUITheme = React.useMemo(() => {
		// Deep merge theme options with default theme and partner theme
		const locale: AvailableLanguages = (router.locale?.toLowerCase() as unknown as AvailableLanguages) ?? 'en'
		return createTheme(deepmerge(startonDarkTheme, theme), connectedLanguages?.[locale] ?? enUS)
	}, [router.locale])

	// Render
	// ----------------------------------------------------------------------------
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={MUITheme}>
				<DefaultSeo {...defaultDataProps} />
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
					<SnackbarProvider
						maxSnack={5}
						Components={{
							info: StartonNotificationInfo,
							success: StartonNotificationSuccess,
							warning: StartonNotificationWarning,
							error: StartonNotificationError,
						}}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
					>
					<AppLayout>
						<Component {...pageProps} />
					</AppLayout>
					</SnackbarProvider>
			</ThemeProvider>
		</CacheProvider>
	)
}
