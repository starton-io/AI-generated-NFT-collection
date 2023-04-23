# AI generated NFT collection

## Set up

Set up the your `.env` file thanks to the `.env.example` file in the `backend/`folder:
```bash
API_HOST=localhost
API_PORT=8000

## Put on the following line your Starton API key (available at https://app.starton.io)
STARTON_API_URL='https://api.starton.io/v3'
STARTON_API_KEY=
STARTON_SIGNER_WALLET=

## Put on the following line your OpenAI API key (available at https://platform.openai.com/account/api-keys)
OPEN_AI_API_KEY=
```

## Run

### Backend

Move into the backend folder :
```bash
cd backend
```

Run the backend :
```bash
yarn dev
```

The backend API run at http://localhost:8000

### Frontend

Move into the frontend folder :
```bash
cd frontend
```

Run the frontend :
```bash
yarn dev
```

The frontend run at http://localhost:3000

BE SURE TO HAVE ENOUGH FAUCET

## Authors

- Tibo Pendino - Backend Developer @starton.io