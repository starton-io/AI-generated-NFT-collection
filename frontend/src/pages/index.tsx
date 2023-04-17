/*
| Developed by Starton
| Filename : index.tsx
| Author : Philippe DESPLATS (philippe@starton.io)
*/

import type { NextPage } from 'next'
import React from 'react'
import { HomeContent } from "../components/pages/home";

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
const Home: NextPage = () => {

	return (
		<React.Fragment>
			<HomeContent/>
		</React.Fragment>
	)
}

export default Home
