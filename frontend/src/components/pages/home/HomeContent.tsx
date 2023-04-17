import React, { SetStateAction, useMemo, useState } from "react";
import {
	Box,
	CircularProgress,
	Typography,
	useTheme,
	Grid, Link
} from "@mui/material";
import { StartonButton } from '../../common/StartonButton'
import { FAQ } from "../../layout/FAQ";
import {
	StartonBlockquote,
	StartonFormikSelect,
	StartonFormikTextField, StartonSelectOptionProps
} from "@starton/ui-nextjs";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import { ElementSvg } from "../../common/svg/ElementSvg";
import { OpenseaSvg } from "../../common/svg/OpenseaSvg";
import { Theme } from "@mui/system";
import { useSnackbar } from "notistack";
import axios, { AxiosInstance, AxiosResponse } from "axios";

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface BodyProps {}

export enum Network {
	ETHEREUM_MAINNET = "ethereum-mainnet",
	ETHEREUM_GOERLI = "ethereum-goerli",

	BINANCE_MAINNET = "binance-mainnet",
	BINANCE_TESTNET = "binance-testnet",

	POLYGON_MAINNET = "polygon-mainnet",
	POLYGON_MUMBAI = "polygon-mumbai",

	AVALANCHE_MAINNET = "avalanche-mainnet",
	AVALANCHE_FUJI = "avalanche-fuji",
}

export const explorerNetwork: Record<Network, string> = {
	[Network.ETHEREUM_MAINNET]: "ethereum",
	[Network.ETHEREUM_GOERLI]: "goerli",
	[Network.BINANCE_MAINNET]: "bsc",
	[Network.BINANCE_TESTNET]: "bsc-testnet",
	[Network.AVALANCHE_MAINNET]: "avalanche",
	[Network.AVALANCHE_FUJI]: "avalanche-fuji",
	[Network.POLYGON_MAINNET]: "matic",
	[Network.POLYGON_MUMBAI]: "mumbai",
}

export interface FormikInitialValues {
	wallet: string | null,
	network: string | null,
	collectionName: string | null,
	nbPictures: string | null,
	prompt: string | null,
}

const initialValues: FormikInitialValues = {
	wallet: '',
	network: '',
	collectionName: '',
	nbPictures: '',
	prompt: ''
}

const FormValidationSchema = Yup.object().shape({
	wallet: Yup.string().required().matches(/(0x[a-fA-F0-9]{40}$)/g),
	network: Yup.mixed<Network>().oneOf(Object.values(Network)).required(),
	collectionName: Yup.string().required(),
	nbPictures: Yup.number().required().min(0).max(10),
	prompt: Yup.string().required(),
})

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const HomeContent: React.FC<BodyProps> = () => {

	const { enqueueSnackbar } = useSnackbar();
	const theme: Theme = useTheme()
	const [pictures, setPictures] = useState([])
	const [isGenerationLoading, setGenerationLoading] = useState(false);
	const [isGenerated, setGeneration] = useState(false);
	const [isDeploymentLoading, setDeploymentLoading] = useState(false);
	const [isDeployed, setDeployment] = useState(false);
	const [formBody, setBody] = useState(initialValues)
	const [isTestnet, setTestnet] = useState(false)
	const [smartContractAddress, setSmartContractAddress] = useState('')
	const [isGenerationError, setGenerationError] = useState(false)
	const [isDeploymentError, setDeploymentError] = useState(false)
	const [error, setError] = useState('')
	const selectOptions: StartonSelectOptionProps[] = useMemo<Array<StartonSelectOptionProps>>(() => {
		return [
			{
				children: 'Ethereum - Mainnet',
				value: Network.ETHEREUM_MAINNET,
			},
			{
				children: 'Ethereum - Goerli',
				value: Network.ETHEREUM_GOERLI,
			},
			{
				children: 'BNB Chain - Mainnet',
				value: Network.BINANCE_MAINNET,
			},
			{
				children: 'BNB Chain - Testnet',
				value: Network.BINANCE_TESTNET,
			},
			{
				children: 'Polygon - Mainnet',
				value: Network.POLYGON_MAINNET,
			},
			{
				children: 'Polygon - Mumbai',
				value: Network.POLYGON_MUMBAI,
			},
			{
				children: 'Avalanche - Mainnet',
				value: Network.AVALANCHE_MAINNET,
			},
			{
				children: 'Avalanche - Fuji',
				value: Network.AVALANCHE_FUJI,
			},
		]
	}, [])
	const axiosInstance: AxiosInstance = axios.create({
		baseURL: 'http://localhost:8000/',
		headers: { 'Content-type': 'application/json; charset=UTF-8' }
	});

	function getCollectionSymbol(collectionName: string): string {
		const words: string[] = collectionName.split(" ");
		const initials: string[] = words.map(word => word.charAt(0).toUpperCase());
		return initials.join("");
	}

	const generatePictures = async (body: FormikInitialValues): Promise<void> => {
		setGenerationLoading(true);
		setBody(body)

		if (body.network === ('ethereum-goerli') ||
			body.network === ('binance-testnet') ||
			body.network === ('polygon-mumbai') ||
			body.network === ('avalanche-fuji')
		) {
			setTestnet(true)
		} else {
			setTestnet(false)
		}

		try {
			console.log('TRY - GENERATE')
			const res: AxiosResponse<any> = await axiosInstance.post('/generate', {
				...body
			})
			setDeploymentLoading(false)
			setDeployment(true)

			setGenerationLoading(false)
			setGenerationError(false)
			setDeploymentError(false)
			setGeneration(true)
			setDeployment(false)
			console.log(res)

			setPictures(res.data.pictures)
			enqueueSnackbar('200 - Pictures successfully generated', {
				variant: 'success',
			})
		} catch (e: any) {
			const error = e
			setGeneration(false)
			setGenerationLoading(false)
			setGenerationError(true)
			enqueueSnackbar(`${error.response.status} - ${e.response.data.message}`, {
				variant: 'error',
			})
		}
	}

	const deployCollection = async (): Promise<void> => {
		setDeploymentLoading(true)

		const content: Record<any, any> = {
			pictures: pictures ? pictures : [],
			ownerWallet: formBody.wallet,
			smartContractName: formBody.collectionName,
			smartContractSymbol: getCollectionSymbol(formBody.collectionName as string),
			network: formBody.network
		}
		console.log('content --- ', content)
		try {
			console.log('TRY - DEPLOY')
			const res: AxiosResponse<any> = await axiosInstance.post('/deploy', {
					...content
				})
			setDeploymentLoading(false)
			setDeploymentError(false)
			setDeployment(true)
			console.log('RES --- ', res)

			setSmartContractAddress(res.data.smartContractAddress)
			enqueueSnackbar('200 - Collection successfully deployed', {
				variant: 'success',
			})
		} catch (e: any) {
			const error = e
			console.log('CATCH - DEPLOY')
			console.log('DEPLOYMENT ERROR')
			setDeployment(false)
			setDeploymentLoading(false)
			setDeploymentError(true)
			enqueueSnackbar(`${error.response.status} - ${e.response.data.message}`, {
				variant: 'error',
			})
		}
	}

	// Render
	//--------------------------------------------------------------------------
	return (
		<Box maxWidth={1192} display="flex" flexDirection="column" gap={15} marginX="auto" marginTop={10} padding={5}>

			{/*TITLE*/}
			<Typography variant="h2" fontWeight={600}>
				Create your NFT collection{' '}
				<Typography color="secondary.main" variant="h2" component="span">
					generated by AI
				</Typography>
			</Typography>

			<Box style={{ display: "flex", flexDirection: "column", justifyContent: 'space-between' }} gap={7}>
				<Box display="flex" flexDirection="column" gap={2}>
					<Typography variant="h3" textTransform="uppercase">
						Collection parameters
					</Typography>
					<Typography color="text.secondary" variant="body1">
						We understand your eagerness to create your NFT collection. To do so, enter all the details for your collection.
						Enter a prompt and click generate to discover the visual assets of your NFTs. You can regenerate assets. When satisfied, click deploy to create your collection.
					</Typography>
				</Box>

				{/*FORM*/}
				<Formik
					initialValues={initialValues}
					validationSchema={FormValidationSchema}
					onSubmit={generatePictures}>
					{/*{(formikProps) => (*/}
					<Form>
						{/*<Typography>{JSON.stringify(formikProps)}</Typography>*/}
						<Box style={{ display: "flex", flexDirection: "column", justifyContent: 'space-between' }} gap={7}>

							<Box style={{ display: "flex", flexDirection: "row", alignItems: 'flex-start', justifyContent: 'space-between', gap: 0 }}>
								<Field
									sx={{width: '73%'}}
									component={StartonFormikTextField}
									name={'wallet'}
									label={'Wallet address'}
									placeholder={'0x...'}
									disabled={isGenerationLoading || isDeploymentLoading}
								/>
								<Field
									sx={{width: '100%'}}
									component={StartonFormikSelect}
									name={'network'}
									selectOptions={selectOptions}
									label={'Blockchain / Network'}
									placeholder={'Select your blockchain / network'}
									placeholderValue={'polygon-mumbai'}
									disabled={isGenerationLoading || isDeploymentLoading}
								/>
							</Box>
							<Box style={{ display: "flex", flexDirection: "row", alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
								<Field
									sx={{width: '73%'}}
									component={StartonFormikTextField}
									name={'collectionName'}
									label={'Collection name'}
									placeholder={'Majestic Collection'}
									disabled={isGenerationLoading || isDeploymentLoading}
								/>
								<Field
									sx={{width: '25%'}}
									component={StartonFormikTextField}
									name={'nbPictures'}
									label={'Number of NFTs'}
									placeholder={'5'}
									type={'number'}
									disabled={isGenerationLoading || isDeploymentLoading}
								/>
							</Box>
							<Box style={{ display: "flex", flexDirection: "row", alignItems: 'flex-end', justifyContent: 'space-between', gap: 6 }}>
								<Field
									sx={{width: isGenerationLoading ? '73%' : '83%'}}
									component={StartonFormikTextField}
									name={'prompt'}
									label={'Prompt'}
									placeholder={'random abstract majestic complex picture 8k'}
									disabled={isGenerationLoading || isDeploymentLoading}
								/>
								<StartonButton
									sx={{width: isGenerationLoading ? '25%' : '15%'}}
									size="small"
									variant="contained"
									disabled={isGenerationLoading || isDeploymentLoading}
									type='submit'
									startIcon={
										isGenerationLoading ? (
											<CircularProgress
												sx={{
													width: 3,
													height: 'unset !important',
													color: `${theme.palette.secondary.dark} !important`,
												}}
											/>
										) : null
									}
								>
									{isGenerationLoading
										? 'Generating...'
										: 'Generate'
									}
								</StartonButton>
							</Box>

						</Box>
					</Form>
					{/*)}*/}
				</Formik>

			</Box>

			{/*PICTURES*/}
			{ isGenerated && !isGenerationError
				? <Grid
					container
					display={'flex'}
					flexDirection="row"
					alignContent={'space-between'}
					maxWidth={'100%'}
					rowSpacing={1}
				>
					{pictures.map((picture) => (
						<Grid item xs={2.3} key={picture} >
							<img
								src={`${picture}`}
								srcSet={`${picture}`}
								style={{borderRadius: '1.5%'}}
								width={'90%'}
								loading="lazy"
								alt={`${picture}`}
							/>
						</Grid>
					))}
				</Grid>
				: null}

			{/*DEPLOYMENT BUTTONS*/}
			{isGenerated
				? isDeployed && !isDeploymentError
					? <Box display="flex" flexDirection="row" gap={4} margin="auto" alignItems={'center'} flexWrap={'wrap'}>
						<Typography color="secondary.main" variant="body1" marginX={'auto'}>
							NFT collection successfully deployed! You can see your collection on :
						</Typography>
						<Box display="flex" flexDirection="row" gap={3} marginX="auto" alignItems={'center'}>
							<Link href={`https://${isTestnet ? 'testnets.' : ''}opensea.io/assets/${explorerNetwork[formBody.network as Network]}/${smartContractAddress}`} target={'_blank'}>
								<a>
									<StartonButton
										size="large"
										variant="contained"
										color="primary"
										disabled={isGenerationLoading}
										startIcon={<OpenseaSvg />}
									>
										Opensea
									</StartonButton>
								</a>
							</Link>
							<Link href={`https://${isTestnet ? 'testnets.' : ''}element.market/`} target={'_blank'}>
								<a>
									<StartonButton
										size="large"
										variant="contained"
										color="primary"
										disabled={true}
										startIcon={<ElementSvg />}
										href={`https://${isTestnet ? 'testnets.' : ''}element.market/`}
									>
										Element
									</StartonButton>
								</a>
							</Link>

						</Box>
					</Box>

					: <Box display="flex" flexDirection="row" gap={10} margin="auto" alignItems={'center'}>
						<StartonButton
							size="large"
							variant="contained"
							color="secondary"
							disabled={isDeploymentLoading || isGenerationLoading}
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
							{isDeploymentLoading
								? 'Deploying...'
								: 'Deploy'
							}
						</StartonButton>
					</Box>
				: null
			}

			<FAQ />
		</Box>
	)
}
