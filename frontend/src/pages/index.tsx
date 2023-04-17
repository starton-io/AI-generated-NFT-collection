/*
| Developed by Starton
| Filename : index.tsx
| Author : Philippe DESPLATS (philippe@starton.io)
*/

import type { NextPage } from 'next'
import React from 'react'
import { Header } from "../components/Header";
import { Body } from "../components/Body";
import { Footer } from "../components/Footer";
import { SnackbarProvider } from "notistack";
import {
	StartonNotificationError, StartonNotificationInfo,
	StartonNotificationSuccess,
	StartonNotificationWarning
} from "../components/common/StartonNotification";

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
const Home: NextPage = () => {

	return (
		<React.Fragment>
			<SnackbarProvider
				maxSnack={5}
				Components={{
					info: StartonNotificationInfo,
					success: StartonNotificationSuccess,
					warning: StartonNotificationWarning,
					error: StartonNotificationError,
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<Header/>
				<Body/>
				<Footer/>
			</SnackbarProvider>
		</React.Fragment>
	)
}

export default Home
