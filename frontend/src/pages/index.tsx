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

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
const Home: NextPage = () => {

	return (
		<React.Fragment>
			<Header/>
			<Body/>
			<Footer/>
		</React.Fragment>
	)
}

export default Home
