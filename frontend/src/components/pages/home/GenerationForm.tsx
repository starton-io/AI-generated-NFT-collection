import React, { useMemo, useState } from "react";
import {
	CircularProgress,
	Typography,
	useTheme,
	Grid, Box
} from "@mui/material";
import {
	StartonFormikSelect,
	StartonFormikTextField, StartonSelectOptionProps
} from "@starton/ui-nextjs";
import { StartonButton } from "@starton/ui-nextjs";
import { Field, useFormikContext } from "formik";
import { Theme } from "@mui/system";
import { networkUrl } from "../../../contracts";

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface GenerationFormProps {
	isDeploymentLoading: boolean,
	setDeploymentLoading:  React.Dispatch<React.SetStateAction<boolean>>
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const GenerationForm: React.FC<GenerationFormProps> = (props: GenerationFormProps) => {

	const formikContext = useFormikContext()

	const theme: Theme = useTheme()
	const { isDeploymentLoading} = props
	const selectOptions: StartonSelectOptionProps[] = useMemo<Array<StartonSelectOptionProps>>(() => {
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
						component={StartonFormikSelect}
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
			<Grid container item direction={'row'} spacing={3} columns={16}  alignItems={'flex-end'}>
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
						type='submit'
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
							{formikContext.isSubmitting
								? 'Generating...'
								: 'Generate'
							}
						</Typography>
					</StartonButton>
				</Grid>
			</Grid>
		</Grid>
	)
}
