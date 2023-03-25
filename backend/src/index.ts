import * as dotenv from 'dotenv'
import * as express from 'express';
import Starton from "./starton";
import OpenAI from "./open-ai";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import { Router } from "./routes";

console.log('$> [CONFIG]\tInitializing environment...')
dotenv.config({ path: '../.env' })
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
    App.app.use(Router)
  }
}

export default App
new App()