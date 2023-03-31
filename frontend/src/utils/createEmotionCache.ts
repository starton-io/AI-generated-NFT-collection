/*
| Developed by Starton
| Filename : createEmotionCache.ts
*/

import createCache from '@emotion/cache'

export function createEmotionCache() {
	return createCache({ key: 'css' })
}
