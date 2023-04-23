import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Box, CircularProgress, Grid, Link, Typography, useTheme } from "@mui/material";
import { DeployBody, explorerNetwork, Network } from "../../../contracts";
import { StartonButton } from "@starton/ui-nextjs";
import { OpenseaSvg } from "../../common/svg/OpenseaSvg";
import { ElementSvg } from "../../common/svg/ElementSvg";
import { getCollectionSymbol } from "../../../utils";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { axiosInstance } from "../../../config/common/axios.config";
import { Theme } from "@mui/system";

export interface DeploymentButtonsProps {
	pictures: string[],
	formBody: Record<any, any>,
	isTestnet: boolean,
	isGenerated: boolean,
	setGeneration: React.Dispatch<React.SetStateAction<boolean>>,
	isDeployed: boolean,
	setDeployment: React.Dispatch<React.SetStateAction<boolean>>,
	isDeploymentError: boolean,
	setDeploymentError: React.Dispatch<React.SetStateAction<boolean>>,
	isDeploymentLoading: boolean,
	setDeploymentLoading: React.Dispatch<React.SetStateAction<boolean>>
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const DeploymentButtons: React.FC<DeploymentButtonsProps> = (props: DeploymentButtonsProps) => {
	const formikContext = useFormikContext()
	const theme: Theme = useTheme()

	const { pictures, formBody, isTestnet } = props
	const { isDeployed, setDeployment} = props
	const { isGenerated, setGeneration} = props
	const { isDeploymentLoading, setDeploymentLoading} = props
	const { isDeploymentError, setDeploymentError} = props

	const [smartContractAddress, setSmartContractAddress] = useState('')

	const deployCollection = async () => {
		setDeploymentLoading(true)

		const content: DeployBody = {
			pictures: pictures ? pictures : [],
			ownerWallet: formBody.wallet,
			smartContractName: formBody.collectionName,
			smartContractSymbol: getCollectionSymbol(formBody.collectionName as string),
			network: formBody.network
		}

		try {
			console.log('TRY - DEPLOY')
			const res: AxiosResponse<any> = await axiosInstance.post('deploy', {
				...content
			})
			setDeploymentLoading(false)
			setDeploymentError(false)
			setDeployment(true)

			setSmartContractAddress(res.data.smartContractAddress)
			enqueueSnackbar('200 - Collection successfully deployed', {
				variant: 'success',
			})
		} catch (e: any) {
			const error = e
			console.log('CATCH - DEPLOY')
			setDeployment(false)
			setDeploymentLoading(false)
			setDeploymentError(true)
			enqueueSnackbar(`${error.response.status} - ${e.response.data.message}`, {
				variant: 'error',
			})
		}
	}

	return (
		<Grid container direction={'row'} spacing={3} columns={16} justifyContent={'center'}>
			{ isGenerated
				? isDeployed && !isDeploymentError
					? <Grid container item xs={16}>
						<Grid display="flex" flexDirection="column" gap={4} margin="auto" alignItems={'center'}>
							<Typography color="secondary.main" variant="body1" marginX={'auto'}>
								NFT collection successfully deployed! You can see your collection on :
							</Typography>
							<Grid container direction={'row'} spacing={3} columns={16} justifyContent={'center'}>
								<Grid item xs={4}>

								<Link href={`https://${isTestnet ? 'testnets.' : ''}opensea.io/assets/${explorerNetwork[formBody.network as Network]}/${smartContractAddress}`} target={'_blank'}>
									<StartonButton
										size="large"
										variant="contained"
										color="primary"
										disabled={formikContext.isSubmitting}
										startIcon={<OpenseaSvg />}
										sx={{
											borderRadius: '8px',
											width: '100%',
											height: '100%',
										}}
									>
										<Typography variant="body1" textTransform="uppercase" fontWeight={'bold'}>
											Opensea
										</Typography>
									</StartonButton>
								</Link>
								</Grid>
								<Grid item xs={4}>

								<StartonButton
									size="large"
									variant="contained"
									color="primary"
									disabled={true}
									startIcon={<ElementSvg />}
									href={`https://${isTestnet ? 'testnets.' : ''}element.market/`}
									sx={{
										borderRadius: '8px',
										width: '100%',
										height: '100%',
									}}
								>
									<Typography variant="body1" textTransform="uppercase" fontWeight={'bold'}>
										Element
									</Typography>
								</StartonButton>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					: <Grid item xs={isDeploymentLoading ? 4 : 3} justifyContent={'space-between'} alignItems={'flex-end'}>
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
							color={'secondary'}
							startIcon={
								isDeploymentLoading ? (
									<CircularProgress
										sx={{
											width: 40,
											height: 'unset !important',
											color: `${theme.palette.secondary.dark} !important`,
										}}
									/>
								) : null
							}
							onClick={deployCollection}
						>
							<Typography variant="body1" textTransform="uppercase" fontWeight={'bold'}>
								{isDeploymentLoading
									? 'Deploying...'
									: 'Deploy'
								}
							</Typography>
						</StartonButton>
					</Grid>
				: null }
			</Grid>
	)
}
