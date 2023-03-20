import * as dotenv from 'dotenv'
import * as express from 'express';
import Starton from "./starton";
import OpenAI from "./open-ai";
import * as bodyParser from "body-parser";
import helmet from "helmet";

console.log('$> [CONFIG]\tInitializing environment...')
dotenv.config({ path: './.env' })
console.log('$> [CONFIG]\tEnvironment successfully initialized.')

class App {
  private API_HOST: string = process.env.API_HOST || 'localhost';
  private API_PORT: string = process.env.API_PORT || '3000';
  static app: express.Application = express();
  static starton: Starton;
  static openAi: OpenAI;

  constructor() {
    App.openAi = new OpenAI();
    App.starton = new Starton();
    this.config();

    App.app.listen(this.API_PORT, () => {
      console.log(`$> Server started at http://${this.API_HOST}:${this.API_PORT}`);
    });
  }

  private config(): void {
    App.app.use(helmet())
    App.app.use(bodyParser.json());
    App.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

App.app.get('/', async (req, res) => {
  res.send(`Welcome to the Starton API !\n` + new Date().toISOString());
});

App.app.post('/generate', async (req, res) => {
  console.log('$> [API]\tPOST /generate')
  try {
    const data = await App.openAi.generatePictures()
    res.send(data)
  } catch (e) {
    console.error(e)
    throw e;
  }
});

App.app.post('/test', async (req, res) => {
  console.log('$> TEST IPFS')
  console.log('req.headers --- ', req.headers)
  console.log('req.body --- ', req.body)

  try {
    res.send()
  } catch (e) {
    console.error(e)
    throw e;
  }
});

App.app.post('/deploy', async (req, res) => {
  const address: string = req.body.address
  const smartContractName: string = req.body.smartContractName
  const pictures: string[] = req.body.pictures
  // TODO - UPLOAD ON IPFS
  // TODO - DEPLOY SMART CONTRACT
  // TODO - MINT
  console.log('$> [API]\tPOST /deploy')
  if(!req.body.data) {
    throw 'ERROR'
  }
  /*try {
    const data = await App.openAi.generatePictures()
    res.send(data)
  } catch (e) {
    console.error(e)
    throw e;
  }*/
});

export default App
new App()