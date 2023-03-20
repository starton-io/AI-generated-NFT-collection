import axios, { AxiosInstance } from 'axios';

class OpenAI {
  private OPEN_AI_API_KEY: string = process.env.OPEN_AI_API_KEY || '';
  private axiosInstance: AxiosInstance;
  private PROMPT: string = 'random abstract majestic complex art picture 8k';
  private N: number = 1
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
      console.error(e)
      throw e;
    }
  }

  public async generatePictures() {
    console.log('$> [OPEN AI]\tgeneratePictures')
    try {
      const res = await this.axiosInstance.post('/images/generations', {
        prompt: this.PROMPT,
        n: this.N,
        size: this.SIZE
      })
      return res.data
    } catch (e) {
      console.error(e)
      throw e;
    }
  }
}

export default OpenAI;
