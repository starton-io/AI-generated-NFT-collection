import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as FormData from "form-data"

class Starton {
  private STARTON_API_URL: string = process.env.STARTON_API_URL || '';
  private STARTON_API_KEY: string = process.env.STARTON_API_KEY || '';
  private STARTON_SIGNER_WALLET: string = process.env.STARTON_SIGNER_WALLET || '';
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

      const data: FormData = new FormData()
      data.append("file", pictureBuffer, 'Test filename')
      data.append("isSync", "true")

      try {
        const ipfsFile: AxiosResponse<any, any> = await this.axiosInstance.post("/ipfs/file", data, {
          headers: {
            "Content-type": `multipart/form-data; boundary=${data.getBoundary()}`,
          },
        })
        ipfsFiles.push(ipfsFile.data.cid)
      } catch (e) {
        console.error(e.response.data)
        throw {
          status: e.response.data.statusCode,
          message: e.response.data.message
        };
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
        const ipfsJson: AxiosResponse<any, any> = await this.axiosInstance.post("/ipfs/json", {
            name: `${smartContractName} - Metadata`,
            content: {
              name: `${smartContractName}`,
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
        console.error(e.response.data)
        throw {
          status: e.response.data.statusCode,
          message: e.response.data.message
        };
      }

    }
    console.log('$> [STARTON]\tuploadPicturesOnIPFS - SUCCESS')
    return ipfsJsons
  }

  public async deployContract(network:string, smartContractName: string, smartContractSymbol: string, supply: number, contractPreviewCID: string): Promise<any> {
    console.log('$> [STARTON]\tdeployContract')

    try {

      const contract: AxiosResponse<any, any> = await this.axiosInstance.post(
        "/smart-contract/from-template",
        {
          network: network,
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
      console.error(e.response.data)
      throw {
        status: e.response.data.statusCode,
        message: e.response.data.message
      };
    }
  }

  public async mintCollection(network: string, smartContractName: string, contract: string, ownerWallet: string, cids: Array<string>): Promise<string[]> {
    console.log('$> [STARTON]\tmintCollection')

    let transaction;
    let transactions: string[] = []

    try {
      for (const i in cids) {
        transaction = await this.axiosInstance.post(
          `/smart-contract/${network}/${contract}/call`,
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
        transactions.push(transaction.data.transactionHash)
      }
      console.log('$> [STARTON]\tmintCollection - SUCCESS')
      return transactions
    } catch(e) {
      console.error(e.response.data)
      throw {
        status: e.response.data.statusCode,
        message: e.response.data.message
      };
    }
  }
}

export default Starton;
