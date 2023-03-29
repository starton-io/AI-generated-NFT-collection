import axios, { AxiosInstance } from 'axios';
import * as FormData from "form-data"

class Starton {
  private STARTON_API_URL: string = process.env.STARTON_API_URL || '';
  private STARTON_API_KEY: string = process.env.STARTON_API_KEY || '';
  private STARTON_SIGNER_WALLET: string = process.env.STARTON_SIGNER_WALLET || '';
  private NETWORK = 'polygon-mumbai';
  private axiosInstance: AxiosInstance;

  constructor() {
    console.log('$> [STARTON]\tInitializing Starton Class...')
    this.axiosInstance = axios.create({
      baseURL: this.STARTON_API_URL,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.STARTON_API_KEY,
      },
    });
    console.log('$> [STARTON]\tStarton Class successfully initialized.')
  }

  public async uploadPicturesOnIPFS(pictureBuffers: Array<Buffer>): Promise<Array<string>> {
    console.log('$> [STARTON]\tuploadPicturesOnIPFS')

    const ipfsFiles: Array<string> = []

    for (const pictureBuffer of pictureBuffers) {

      const data = new FormData()
      data.append("file", pictureBuffer, 'Test filename')
      data.append("isSync", "true")

      try {
        const ipfsFile = await this.axiosInstance.post("/ipfs/file", data, {
          headers: {
            "Content-type": `multipart/form-data; boundary=${data.getBoundary()}`,
          },
        })
        ipfsFiles.push(ipfsFile.data.cid)
      } catch (e) {
        const error = e.response.data
        console.error(error)
        throw error;
      }
    }
    console.log('$> [STARTON]\tuploadPicturesOnIPFS - SUCCESS')
    return ipfsFiles
  }

  public async uploadMetadataOnIPFS(smartContractName: string, picturesCids: Array<string>): Promise<Array<string>> {
    console.log('$> [STARTON]\tuploadMetadataOnIPFS')

    const ipfsJsons: Array<string> = []

    for (const picturesCid of picturesCids) {

      try {
        const ipfsJson = await this.axiosInstance.post("/ipfs/json", {
            name: `${smartContractName} - Metadata`,
            content: {
              name: `${smartContractName} NFT`,
              description: "NFT Description",
              image: `ipfs://ipfs/${picturesCid}`,
              attributes: {
                size: 42,
                media: "picture",
                company: "Starton"
              }
            },
            metadata: {},
        })
        ipfsJsons.push(ipfsJson.data.cid)

      } catch (e) {
        const error = e.response.data
        console.error(error)
        throw error;
      }

    }
    console.log('$> [STARTON]\tuploadPicturesOnIPFS - SUCCESS')
    return ipfsJsons
  }

  public async deployContract(smartContractName: string, smartContractSymbol: string, supply: number, contractPreviewCID: string): Promise<any> {
    console.log('$> [STARTON]\tdeployContract')

    try {

      const contract = await this.axiosInstance.post(
        "/smart-contract/from-template",
        {
          network: this.NETWORK,
          signerWallet: this.STARTON_SIGNER_WALLET,
          templateId: "ERC721_CAPPED_META_TRANSACTION",
          name: smartContractName,
          description: "This NFT collection has been deployed using Starton API.",
          params: [
            smartContractName,
            smartContractSymbol,
            supply,
            "ipfs://ipfs/",
            `ipfs://ipfs/${contractPreviewCID}`,
            this.STARTON_SIGNER_WALLET
          ]
        }
      )

      console.log('$> [STARTON]\tdeployContract - SUCCESS')
      return contract.data.smartContract.address
    } catch (e) {
      const error = e.response.data
      console.error(error)
      throw error;
    }
  }

  public async mintCollection(smartContractName: string, contract: string, ownerWallet: string, cids: Array<string>): Promise<string> {
    console.log('$> [STARTON]\tmintCollection')

    let transaction;

    try {
      for (const i in cids) {
        transaction = this.axiosInstance.post(
          `/smart-contract/${this.NETWORK}/${contract}/call`,
          {
            functionName: "mint(address,string)",
            params: [
              ownerWallet,
              cids[i]
            ],
            signerWallet: this.STARTON_SIGNER_WALLET,
            speed: "average"
          }
        )
      }
    } catch(e) {
      const error = e.response.data
      console.error(error)
      throw error;
    }

    console.log('$> [STARTON]\tmintCollection - SUCCESS')
    return ''
  }
}

export default Starton;
