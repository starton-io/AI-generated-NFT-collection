import axios, { AxiosInstance } from 'axios';
import { AxiosResponse } from "axios/index";

class OpenAI {
  private OPEN_AI_API_KEY: string = process.env.OPEN_AI_API_KEY || '';
  private axiosInstance: AxiosInstance;
  // private PROMPT: string = 'random abstract majestic complex picture 8k';

  constructor() {
    console.log('$> [OPEN AI]\tInitializing OpenAI Class...')

    try {
      this.axiosInstance = axios.create({
        baseURL: "https://api.openai.com/v1",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.OPEN_AI_API_KEY}`
        }
      });
      console.log('$> [OPEN AI]\tOpenAI Class successfully initialized.')
    } catch (e) {
      throw e;
    }

  }

  public async generatePictures(body): Promise<Record<'pictures', Array<string>>> {
    console.log('$> [OPEN AI]\tgeneratePictures')

    const pictureArray: Array<string> = []
    const prompt: string = body.prompt
    const nbPictures: number = parseInt(body.nbPictures)
    const size: string = '1024x1024'

    try {
      const res: AxiosResponse<any, any> = await this.axiosInstance.post('/images/generations', {
        prompt: prompt,
        n: nbPictures,
        size: size
      })
      for (let i = 0; i < nbPictures; i++) {
        pictureArray.push(res.data.data[i].url)
      }
      console.log('$> [OPEN AI]\tgeneratePictures - SUCCESS')
      return {
        pictures: pictureArray
      }
    } catch (e) {
      console.log('generatePictures ERROR')
      console.log(e.response.status)
      const error = e.response.data
      console.error(error)
      throw {
        status: e.response.status,
        message: e.response.data.error.message
      };
    }

  }

  public async extractPictureBuffers(pictures: Array<string>): Promise<Array<Buffer> | null> {
    console.log('$> [OPEN AI]\textractPictureBuffers')

    const bufferArray: Array<Buffer> = []

    if (!pictures.length) {
      const error: string = 'There is no picture.'
      console.error(error)
      throw error;
    }

    try {
      for (const i in pictures) {
        const res: AxiosResponse<any, any> = await axios.get(pictures[i], {
          responseType: 'arraybuffer',
        })
        const buffer: Buffer = Buffer.from(res.data, "utf-8")
        bufferArray.push(buffer)
      }
    } catch (e) {
      console.error(e.response)
      throw {
        status: e.response.status,
        message: e.response.statusText
      };
    }

    console.log('$> [OPEN AI]\textractPictureBuffers - SUCCESS')
    return bufferArray;
  }

}

export default OpenAI;
