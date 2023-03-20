import axios, { AxiosInstance } from 'axios';
// import * as formData from "form-data"

// const uploadFileOnIPFS = async (bufferFile: Buffer, name: string) => {
//   const data = new formData()
//
//   const storage_name: string = name
//   data.append("file", bufferFile, storage_name)
//   data.append("isSync", "true")
//
//   const ipfsFileResponse = await axios.post(baseUrl + version + "/pinning/content/file", data, {
//     maxBodyLength: Infinity,
//     headers: {
//       "Content-Type": `multipart/form-data; boundary=${data.getBoundary()}`,
//       ...headersConfig,
//     },
//   })
//   return ipfsFileResponse.data
// }

class Starton {
  private STARTON_API_URL: string = process.env.STARTON_API_URL || '';
  private STARTON_API_KEY: string = process.env.STARTON_API_KEY || '';
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

  private async uploadCollection(): Promise<string> {
    console.log('$> [STARTON]\tuploadCollection')
    return ''
  }

  private async deployContract(): Promise<string> {
    console.log('$> [STARTON]\tdeployContract')
    return ''
  }

  private async mintCollection(address: string): Promise<string> {
    console.log('$> [STARTON]\tmintCollection')
    return ''
  }
}

export default Starton;
