/*
| Developed by Starton
| Filename : _document.tsx
*/

import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { createEmotionCache } from 'utils/createEmotionCache'
import theme from 'styles/theme'

export default class StartonDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* PWA primary color */}
					{/* @ts-ignore */}
					<meta name="theme-color" content={theme?.palette?.primary?.main ?? '#469D95'} />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" />
					<link rel="preload" href="/fonts/fira-code/FiraCode-Light.woff2" as="font" type="font/woff2" />
					<link rel="preload" href="/fonts/fira-code/FiraCode-Regular.woff2" as="font" type="font/woff2" />
					<link rel="preload" href="/fonts/fira-code/FiraCode-Medium.woff2" as="font" type="font/woff2" />
					<link rel="preload" href="/fonts/fira-code/FiraCode-SemiBold.woff2" as="font" type="font/woff2" />
					<link rel="preload" href="/fonts/fira-code/FiraCode-Bold.woff2" as="font" type="font/woff2" />
					<link rel="preload" href="/fonts/fira-code/FiraCode-VF.woff2" as="font" type="font/woff2" />
					<link
						rel="preload"
						href="/fonts/pp-neue-machina/PPNeueMachina-InktrapThin.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/fonts/pp-neue-machina/PPNeueMachina-InktrapUltralight.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/fonts/pp-neue-machina/PPNeueMachina-InktrapLight.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/fonts/pp-neue-machina/PPNeueMachina-InktrapRegular.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/fonts/pp-neue-machina/PPNeueMachina-InktrapMedium.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/fonts/pp-neue-machina/PPNeueMachina-InktrapSemibold.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/fonts/pp-neue-machina/PPNeueMachina-InktrapBold.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/fonts/pp-neue-machina/PPNeueMachina-InktrapUltrabold.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/fonts/pp-neue-machina/PPNeueMachina-InktrapBlack.woff2"
						as="font"
						type="font/woff2"
					/>
				</Head>
				<body>
				<Main />
				<NextScript />
				</body>
			</Html>
		)
	}
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
StartonDocument.getInitialProps = async (ctx) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	const originalRenderPage = ctx.renderPage

	// You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
	// However, be aware that it can have global side effects.
	const cache = createEmotionCache()
	const { extractCriticalToChunks } = createEmotionServer(cache)

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) =>
				function EnhanceApp(props) {
					// @ts-ignore
					return <App emotionCache={cache} {...props} />
				},
		})

	const initialProps = await Document.getInitialProps(ctx)
	// This is important. It prevents emotion to render invalid HTML.
	// See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
	const emotionStyles = extractCriticalToChunks(initialProps.html)
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	))

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
	}
}
