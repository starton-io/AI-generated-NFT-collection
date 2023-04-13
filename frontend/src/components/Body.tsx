import React, { useMemo, useState } from "react";
import {
	Box,
	CircularProgress,
	Typography,
	useTheme,
	Grid, Link
} from "@mui/material";
import { StartonButton } from './common/StartonButton'
import { FAQ } from "./FAQ";
import {
	StartonFormikSelect,
	StartonFormikTextField, StartonSelectOptionProps
} from "@starton/ui-nextjs";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import { ElementSvg } from "./common/svg/ElementSvg";
import { OpenseaSvg } from "./common/svg/OpenseaSvg";
import { Theme } from "@mui/system";

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface BodyProps {}

// TO MOVE
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

// TO MOVE
export const explorerNetwork: Record<Network, string> = {
	[Network.ETHEREUM_MAINNET]: "ethereum", // DONE
	[Network.ETHEREUM_GOERLI]: "goerli", // DONE
	[Network.BINANCE_MAINNET]: "bsc", // DONE
	[Network.BINANCE_TESTNET]: "bsc-testnet", // DONE
	[Network.AVALANCHE_MAINNET]: "avalanche", // DONE
	[Network.AVALANCHE_FUJI]: "avalanche-fuji", // DONE
	[Network.POLYGON_MAINNET]: "matic", // DONE
	[Network.POLYGON_MUMBAI]: "mumbai", // DONE
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const Body: React.FC<BodyProps> = () => {

	interface FormikInitialValues {
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

	const theme: Theme = useTheme()
	const [pictures, setPictures] = useState([])
	const [isGenerationLoading, setGenerationLoading] = useState(false);
	const [isGenerated, setGeneration] = useState(false);
	const [isDeploymentLoading, setDeploymentLoading] = useState(false);
	const [isDeployed, setDeployment] = useState(false);
	const [body, setBody] = useState(initialValues)
	const [isTestnet, setTestnet] = useState(false)
	const [smartContractAddress, setSmartContractAddress] = useState('')
	// const [selected, setSelected] = useState('')

	function getCollectionSymbol(collectionName: string): string {
		const words: string[] = collectionName.split(" ");
		const initials: string[] = words.map(word => word.charAt(0).toUpperCase());
		return initials.join("");
	}

	// TO DELETE
	// function getCollectionUrl(collectionName: string): string {
	// 	const res = collectionName.replace(" ", '-').toLowerCase();
	// 	return res
	// }

	const generatePictures = async (body: any) => {
		setGenerationLoading(true);

		if (body.network === ('ethereum-goerli') ||
			body.network === ('binance-testnet') ||
			body.network === ('polygon-mumbai') ||
			body.network === ('avalanche-fuji')
		) {
			setTestnet(true)
		}

		await fetch('http://localhost:8000/generate', {
			method: 'POST',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
			mode: 'cors',
			body: JSON.stringify(body)
		}).then(response => {
			setGenerationLoading(false)
			setGeneration(true)
			setDeployment(false)
			return response.json()
		}).then(data => {
			setPictures(data.pictures)
		}).catch((e) => { console.error(e)})
	}

	const deployCollection = async () => {
		setDeploymentLoading(true)

		const content: string = JSON.stringify({
			pictures: pictures ? pictures : [],
			ownerWallet: body.wallet,
			smartContractName: body.collectionName,
			smartContractSymbol: getCollectionSymbol(body.collectionName as string),
			network: body.network
		})

		await fetch('http://localhost:8000/deploy', {
			method: 'POST',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
			mode: 'cors',
			body: content
		}).then(response => {
			setDeploymentLoading(false)
			setDeployment(true)
			return response.json()
		}).then(data => {
			console.log('deployCollection --- ', data)
			setSmartContractAddress(data.smartContractAddress)
		}).catch((e) => { console.error(e)})
	}

	const handleGenerationSubmit = async (body: FormikInitialValues) => {
		setBody(body)
		console.log('BODY - ', body)
		await generatePictures(body)
	}

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

	// prompt: 'random abstract majestic complex picture 8k'

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
					onSubmit={handleGenerationSubmit}>
					{/*{(formikProps) => (*/}
						<Form>
							{/*<Typography>{JSON.stringify(formikProps)}</Typography>*/}
							<Box style={{ display: "flex", flexDirection: "column", flexWrap: 'wrap', justifyContent: 'space-between' }} gap={7}>

								<Box style={{ display: "flex", flexDirection: "row", alignItems: 'flex-end', justifyContent: 'space-between', gap: 0 }}>
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
									{/*<Field*/}
									{/*	sx={{width: '25%'}}*/}
									{/*	component={StartonFormikTextField}*/}
									{/*	name={'network'}*/}
									{/*	// selectOptions={selectOptions}*/}
									{/*	label={'Blockchain / Network'}*/}
									{/*	placeholder={'polygon-mumbai'}*/}
									{/*	// placeholderValue={'polygon-mumbai'}*/}
									{/*	disabled={isGenerationLoading || isDeploymentLoading}*/}
									{/*/>*/}
								</Box>
								<Box style={{ display: "flex", flexDirection: "row", alignItems: 'flex-end', justifyContent: 'space-between', gap: 6 }}>
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
										label={'Number of pictures'}
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
			{ isGenerated
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
					? isDeployed
						? <Box display="flex" flexDirection="row" gap={4} margin="auto" alignItems={'center'} flexWrap={'wrap'}>
							<Typography color="secondary.main" variant="body1" marginX={'auto'}>
								NFT collection successfully deployed! You can see you collection on :
							</Typography>
							<Box display="flex" flexDirection="row" gap={3} marginX="auto" alignItems={'center'}>
								<Link href={`https://${isTestnet ? 'testnets.' : ''}opensea.io/assets/${explorerNetwork[body.network as Network]}/${smartContractAddress}`} target={'_blank'}>
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
								disabled={isDeploymentLoading}
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
