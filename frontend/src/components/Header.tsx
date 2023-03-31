import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import { StartonSvg } from "./StartonSvg";

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
			<Link href="https://starton.io" underline="none">
				<Typography marginLeft={7} color="text.secondary" variant="body1">
					Powered by
				</Typography>
				<StartonSvg fill="primary.main" sx={{ width: 272, height: 48 }} />
			</Link>
		</Box>
	)
}
