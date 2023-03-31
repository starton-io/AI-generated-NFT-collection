/*
| Developed by Starton
| Filename : useGetCanonialUrl.tsx
*/

import React from 'react'
import { Router, useRouter } from 'next/router'
import StartonUtils from 'utils/starton.utils'

export const useGetCanonialUrl = (router?: Router) => {
	const localRouter = useRouter()

	const canonicalPath = React.useMemo(() => {
		return (router ?? localRouter).pathname === '/' ? '' : (router ?? localRouter).pathname
	}, [localRouter, router])
	const url = React.useMemo(() => {
		return `${StartonUtils.getURL()}${canonicalPath}`
	}, [canonicalPath])

	return { canonicalPath, url, canonical: StartonUtils.getURL() }
}
