import * as dotenv from 'dotenv'
import * as express from 'express';
import helmet from "helmet";
import Starton from "./starton";
import OpenAI from "./open-ai";
import * as bodyParser from "body-parser";
import { Router } from "./routes";
import * as cors from "cors";

console.log('$> [CONFIG]\tInitializing environment...')
dotenv.config()
console.log('$> [CONFIG]\tEnvironment successfully initialized.')

/*
|------------------------------------------------------------------------------------------------------------------
| App class that set up security dependencies, will create Starton and OpenAI instances and will run on the server
|------------------------------------------------------------------------------------------------------------------
*/
class App {
  private API_HOST: string = process.env.API_HOST || 'localhost';
  private API_PORT: string = process.env.API_PORT || '3000';
  private app: express.Application = express();
  static starton: Starton;
  static openAi: OpenAI;

  constructor() {
    App.openAi = new OpenAI();
    App.starton = new Starton();
    this.config();

    this.app.listen(this.API_PORT, (): void => {
      console.log(`$> Server started at http://${this.API_HOST}:${this.API_PORT}`);
    });
  }

  private config(): void {
    this.app.use(helmet())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors({
      origin: true,
      credentials: true,
    }))

    this.app.use(Router)
  }
}

export default App
new App()