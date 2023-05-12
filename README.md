![Starton Banner](https://github.com/starton-io/.github/blob/master/github-banner.jpg?raw=true)

# Starton - AI generated NFT collection

## Requirements

You will need :
- [NodeJS](https://nodejs.org/en) (we recommend the use of [nvm](https://github.com/nvm-sh/nvm))
- [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/)

## Installation

To install the project, first clone the repository and go inside project directory, then :

- With [yarn](https://yarnpkg.com/) :
    ```bash
    $ yarn install
    ```

- With [NPM](https://www.npmjs.com/) :
    ```bash
    $ npm install
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend
* `NODE_ENV` : is a system environment variable that Node exposes into running scripts
* `API_HOST` : API host
* `API_PORT` : API port
* `STARTON_API_URL` : Starton API address (default: https://api.starton.com/v3)
* `STARTON_API_KEY` : Put on the following line your Starton API key (available at [https://app.starton.com](https://app.starton.com))
* `STARTON_SIGNER_WALLET` : The address of your wallet
* `OPEN_AI_API_KEY` : Put on the following line your OpenAI API key (available at [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys))

### Frontend
* `NODE_ENV` : is a system environment variable that Node exposes into running scripts
* `NEXT_PUBLIC_BACK_URL` : the address to the backend

## Run Locally

Your project is now ready to be modified by you, for that you just have to launch the project via the command below.

### Backend

- With [yarn](https://yarnpkg.com/) :
    ```bash
    $ yarn dev
    ```

- With [NPM](https://www.npmjs.com/) :
    ```bash
    $ npm run dev
    ```

The backend API run at http://localhost:8000

### Frontend

- With [yarn](https://yarnpkg.com/) :
    ```bash
    $ yarn dev
    ```

- With [NPM](https://www.npmjs.com/) :
    ```bash
    $ npm run dev
    ```

The frontend run at http://localhost:3000

## Deployment

To deploy this project run :

- With [yarn](https://yarnpkg.com/) :
    ```bash
    $ yarn build
    ```

- With [NPM](https://www.npmjs.com/) :
    ```bash
    $ npm build
    ```

If the build is successful, run :

- With [yarn](https://yarnpkg.com/) :
    ```bash
    $ yarn serve
    ```

- With [NPM](https://www.npmjs.com/) :
    ```bash
    $ npm run serve
    ```

## Documentation

Find out more on how to use Starton in our [Documentation](https://docs.starton.com/)

## Contributing

Contributions are always welcome!

See [Contributing](/CONTRIBUTING.md) for ways to get started.

Please adhere to Starton's [Code of Conduct](/CODE_OF_CONDUCT.md).

## License

[Apache License 2.0](/LICENSE.md)

## Authors

- Starton [support@starton.com](mailto:support@starton.com)
- Tibo Pendino [tibo@starton.com](mailto:tibo@starton.com)
