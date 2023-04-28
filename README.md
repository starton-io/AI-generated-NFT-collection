# AI generated NFT collection

## Set up

Set up the your `.env` file thanks to the `.env.example` file in the `backend/`folder:
```bash
API_HOST=localhost
API_PORT=8000

## Put on the following line your Starton API key (available at https://app.starton.com)
STARTON_API_URL='https://api.starton.com/v3'
STARTON_API_KEY=
STARTON_SIGNER_WALLET=

## Put on the following line your OpenAI API key (available at https://platform.openai.com/account/api-keys)
OPEN_AI_API_KEY=
```

Then, set up the your `.env` file thanks to the `.env.example` file in the `frontend/`folder:
```bash
########################################################################################################################
#
# STARTON - Environment file
#
########################################################################################################################

NEXT_PUBLIC_BACK_URL=http://localhost:8000
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

## Authors

**Tibo Pendino** - _Backend Developer @starton.com_ ([GitHub](https://github.com/tibo-pdn), [LinkedIn](https://www.linkedin.com/in/tibo-pendino/))