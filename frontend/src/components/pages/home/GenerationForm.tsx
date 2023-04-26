/*
| Developed by Starton
| Filename : GenerationForm.tsx
| Author : Tibo PENDINO (tibo@starton.io)
*/

import React from 'react'
import { CircularProgress, Typography, useTheme, Grid, styled } from '@mui/material'
import {
	StartonFormikSelect,
	StartonFormikTextField,
	StartonSelectOptionProps,
	StartonButton,
	StartonFormikSelectProps,
} from '@starton/ui-nextjs'
import { Field, useFormikContext } from 'formik'
import { Theme } from '@mui/system'
import { networkUrl } from '../../../contracts'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface GenerationFormProps {
	isDeploymentLoading: boolean
	setDeploymentLoading: React.Dispatch<React.SetStateAction<boolean>>
}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/
const StartonFormikSelectStyled = styled(StartonFormikSelect)<StartonFormikSelectProps>(({ theme }) => ({
	fontSize: '14px',
}))

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const GenerationForm: React.FC<GenerationFormProps> = ({ isDeploymentLoading }) => {
	const formikContext = useFormikContext()
	const theme: Theme = useTheme()
	const selectOptions: StartonSelectOptionProps[] = React.useMemo<Array<StartonSelectOptionProps>>(() => {
		return networkUrl
	}, [])

	// Render
	//--------------------------------------------------------------------------
	return (
		<Grid container spacing={7} direction={'column'}>
			<Grid container item direction={'row'} spacing={3} columns={16}>
				<Grid item xs={12}>
					<Field
						component={StartonFormikTextField}
						name={'wallet'}
						label={'Wallet address'}
						placeholder={'0x...'}
						disabled={formikContext.isSubmitting || isDeploymentLoading}
					/>
				</Grid>
				<Grid item xs={4}>
					<Field
						component={StartonFormikSelectStyled}
						name={'network'}
						selectOptions={selectOptions}
						label={'Blockchain / Network'}
						placeholder={'Select your blockchain / network'}
						placeholderValue={'polygon-mumbai'}
						disabled={formikContext.isSubmitting || isDeploymentLoading}
					/>
				</Grid>
			</Grid>
			<Grid container item direction={'row'} spacing={3} columns={16}>
				<Grid item xs={12}>
					<Field
						component={StartonFormikTextField}
						name={'collectionName'}
						label={'Collection name'}
						placeholder={'Majestic Collection'}
						disabled={formikContext.isSubmitting || isDeploymentLoading}
					/>
				</Grid>
				<Grid item xs={4}>
					<Field
						component={StartonFormikTextField}
						name={'nbPictures'}
						label={'Number of NFTs'}
						placeholder={'5'}
						type={'number'}
						disabled={formikContext.isSubmitting || isDeploymentLoading}
					/>
				</Grid>
			</Grid>
			<Grid container item direction={'row'} spacing={3} columns={16} alignItems={'center'}>
				<Grid item xs={formikContext.isSubmitting ? 12 : 13}>
					<Field
						component={StartonFormikTextField}
						name={'prompt'}
						label={'Prompt'}
						placeholder={'random abstract majestic complex picture 8k'}
						disabled={formikContext.isSubmitting || isDeploymentLoading}
					/>
				</Grid>
				<Grid item xs={formikContext.isSubmitting ? 4 : 3}>
					<StartonButton
						sx={{
							borderRadius: '8px',
							width: '100%',
							height: 'auto',
						}}
						size="large"
						variant="contained"
						disabled={formikContext.isSubmitting || isDeploymentLoading}
						type="submit"
						startIcon={
							formikContext.isSubmitting ? (
								<CircularProgress
									sx={{
										width: 40,
										height: 'unset !important',
										color: `${theme.palette.secondary.dark} !important`,
									}}
								/>
							) : null
						}
					>
						<Typography variant="body1" textTransform="uppercase" fontWeight={'bold'}>
							{formikContext.isSubmitting ? 'Generating...' : 'Generate'}
						</Typography>
					</StartonButton>
				</Grid>
			</Grid>
		</Grid>
	)
}
