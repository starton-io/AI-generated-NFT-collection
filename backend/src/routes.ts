import * as express from 'express';
import App from "./index";
import { Router } from "express";

const router: Router = express.Router();

router.get('/', async (req, res): Promise<void> => {
  console.log('$> [API]\tGET /')
  res.status(200).json({ message: `Welcome to the Starton API !\nCurrent time is : ` + new Date().toISOString() });
  console.log('$> [API]\tGET / - SUCCESS')
});

router.post('/generate', async (req, res) => {
  console.log('$> [API]\tPOST /generate')
  console.log(req.body)

  if (!req.body) {
    const error: string = 'Body is missing in your request'
    console.log(error)
    return res.status(400).json({
      message: error,
      error: null
    })
  }

  if (!req.body.collectionName || !req.body.nbPictures || !req.body.prompt) {
    const error: string = 'Incomplete request, you must provide collectionName, nbPictures and prompt fields'
    console.log(error)
    return res.status(400).json({
      message: error,
      error: null
    })
  }

  try {
    const pictureArray: Record<'pictures', string[]> = await App.openAi.generatePictures(req.body)
    console.log('pictureArray -', pictureArray)
    console.log('$> [API]\tPOST /generate - SUCCESS')
    return res.json(pictureArray)
  } catch (e) {
    const error = e
    console.error(e)
    return res.status(error.status).json({
      message: error.message,
      error: e
    })
  }
});

router.post('/deploy', async (req, res) => {
  console.log('$> [API]\tPOST /deploy')

  if (!req.body) {
    const error: string = 'Body is missing in your request'
    console.log(error)
    return res.status(400).json({
      message: error,
      error: null
    })
  }

  if (!req.body.smartContractName || !req.body.smartContractSymbol || !req.body.ownerWallet || !req.body.pictures || !req.body.network) {
    const error: string = 'Incomplete request. You need to provide an address (ownerWallet), a name for your smartContract (smartContractName), a symbol (smartContractSymbol), a network (network) and pictures for your collection (pictures).'
    console.log(error)
    return res.status(400).json({
      message: error,
      error: null
    })
  }

  if (!req.body.ownerWallet.match(/0x[a-fA-F0-9]{40}/)) {
    const error: string = 'Invalid address format'
    console.log(error)
    return res.status(400).json({
      message: error,
      error: null
    })
  }

  console.log('body -', req.body)

  const network: string = req.body.network
  const smartContractName: string = req.body.smartContractName
  const smartContractSymbol: string = req.body.smartContractSymbol
  const ownerWallet = req.body.ownerWallet
  const pictures: Array<string> = req.body.pictures ? req.body.pictures : []

  if (!pictures.length) {
    const error: string = 'Incomplete request, pictures array should not be empty'
    console.error(error)
    return res.status(400).json({
      message: error,
      error: null
    })
  }

  console.log(pictures)

  let picturesBuffers: Array<Buffer> = []

  try {
    picturesBuffers = await App.openAi.extractPictureBuffers(pictures)
  } catch (e) {
    console.error(e)
    return res.status(e.status).json({
      message: e.message,
      error: e
    })
  }

  console.log('picturesBuffers -', picturesBuffers)

  let picturesCids: Array<string> = []

  try {
    picturesCids = await App.starton.uploadPicturesOnIPFS(picturesBuffers)
  } catch (e) {
    console.error(e)
    return res.status(e.status).json({
      message: e.message,
      error: e
    })
  }

  console.log('picturesCids -', picturesCids)

  let metadataCids: Array<string> = []

  try {
    metadataCids = await App.starton.uploadMetadataOnIPFS(smartContractName, picturesCids)
  } catch (e) {
    console.error(e)
    return res.status(e.status).json({
      message: e.message,
      error: e
    })
  }

  console.log('metadataCids -', metadataCids)

  let contract: string = ''

  try {
    contract = await App.starton.deployContract(network, smartContractName, smartContractSymbol, picturesCids.length, metadataCids[0])
  } catch (e) {
    console.error(e)
    return res.status(e.status).json({
      message: e.message,
      error: e
    })
  }

  console.log('contract -', contract)

  await new Promise(f=>setTimeout(f, 5000))

  let transactions
  try {
    transactions = await App.starton.mintCollection(network, smartContractName, contract, ownerWallet, metadataCids)
  } catch (e) {
    console.error(e)
    return res.status(e.status).json({
      message: e.message,
      error: e
    })
  }

  console.log('transactions -', transactions)
  console.log('$> [API]\tPOST /deploy - SUCCESS')

  return res.json({
    message: 'Collection successfully deployed',
    smartContractAddress: contract,
    error: null
  })
});

export { router as Router }
