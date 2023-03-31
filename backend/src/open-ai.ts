import axios, { AxiosInstance } from 'axios';

class OpenAI {
  private OPEN_AI_API_KEY: string = process.env.OPEN_AI_API_KEY || '';
  private axiosInstance: AxiosInstance;
  private PROMPT: string = 'random abstract majestic complex picture 8k';
  private N: number = 10
  private SIZE: string = '1024x1024';

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

  public async generatePictures(): Promise<Record<'pictures', Array<string>>> {
    console.log('$> [OPEN AI]\tgeneratePictures')

    const pictureArray: Array<string> = []

    try {
      const res = await this.axiosInstance.post('/images/generations', {
        prompt: this.PROMPT,
        n: this.N,
        size: this.SIZE
      })
      for (let i = 0; i < this.N; i++) {
        pictureArray.push(res.data.data[i].url)
      }
      console.log('$> [OPEN AI]\tgeneratePictures - SUCCESS')
      return {
        pictures: pictureArray
      }
    } catch (e) {
      const error = e.response.data
      console.error(error)
      throw error;
    }

  }

  public async extractPictureBuffers(pictures: Array<string>): Promise<Array<Buffer> | null> {
    console.log('$> [OPEN AI]\textractPictureBuffers')

    const bufferArray: Array<Buffer> = []

    try {
      for (const i in pictures) {
        const res = await axios.get(pictures[i], {
          responseType: 'arraybuffer',
        })
        const buffer = Buffer.from(res.data, "utf-8")
        bufferArray.push(buffer)
      }
    } catch (e) {
      const error = e.response.data
      console.error(error)
      throw error;
    }

    console.log('$> [OPEN AI]\textractPictureBuffers - SUCCESS')
    return bufferArray;
  }

}

export default OpenAI;
