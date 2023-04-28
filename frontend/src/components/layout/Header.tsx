import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import { StartonLogotype } from '@starton/ui-nextjs'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface HeaderProps {}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const Header: React.FC<HeaderProps> = () => {
	// Render
	//--------------------------------------------------------------------------
	return (
		<Box padding={10} paddingBottom={5}>
			<Link href="https://starton.com" underline="none">
				<Typography marginLeft={7} color="text.secondary" variant="body1">
					Powered by
				</Typography>
				<StartonLogotype fill="primary.main" sx={{ width: 272, height: 48 }} />
			</Link>
		</Box>
	)
}
